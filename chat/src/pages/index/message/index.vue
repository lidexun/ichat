<script setup>
import { useRoute, useRouter } from 'vue-router'
import { openUserChat } from '@/utils/user.js'
import { getMessage, setReadMessage } from '@/api/user.js'
import { transferData } from '@/utils/message.js'
import { useMessageStore } from '@/store/index.js'
import storage from '@/utils/storage.js'
import emitter from '@/utils/bus.js'
const router = useRouter()
const uid = storage.getItem('userInfo')._id
const store = useMessageStore()
const storageMessageList = storage.getItem(uid + 'messageList')
let messageList = storageMessageList
  ? new Map(Object.entries(storageMessageList))
  : new Map()
let state = reactive({
  list: []
})
// 最后一条数据的记录时间
let time = storage.getItem(uid + 'messageStartTime') || 0
onMounted(() => {
  // 先拿本地缓存数据渲染
  if (time !== 0 && messageList.size !== 0) {
    messageList.forEach((item) => {
      state.list.push({
        ...transferData(item.list[0]),
        count: item.count,
        userinfo: item.list[0].userinfo
      })
    })
    setMessageCount()
  }
  getMessage({ time }).then((res) => {
    const { data } = res
    if (data.length === 0) {
      return
    }
    handleMessageData(data)
  })
})
function handleMessageData(data, keyVal, type) {
  data.forEach((item) => {
    const key = keyVal || item.from_uid === uid ? item.to_uid : item.from_uid
    const temp = messageList.get(key)
    let count = temp !== undefined && temp.count ? temp.count : 0
    if (item.from_uid !== uid && Number.parseInt(item.is_read) === 0) {
      count = count + 1
    }
    let tempList = temp ? temp.list : []
    if (type === 'io') {
      tempList.unshift(item)
    } else {
      tempList.push(item)
    }
    messageList.set(key, {
      list: tempList,
      count
    })
  })
  storage.setItem(uid + 'messageList', Object.fromEntries(messageList))
  storage.setItem(uid + 'messageStartTime', data[0].createTime)
  if (type === 'io') {
    data.forEach((item) => {
      const key = keyVal || item.from_uid === uid ? item.to_uid : item.from_uid
      const findIndex = state.list.findIndex(
        (item) => item.from_uid === key || item.to_uid === key
      )
      if (findIndex === -1) {
        state.list.push({
          ...transferData({
            ...item
          }),
          count: messageList.get(key).count
        })
      } else {
        state.list[findIndex] = {
          ...transferData({
            ...item,
            userinfo: state.list[findIndex].userinfo
          }),
          count: messageList.get(key).count
        }
      }
    })
  } else {
    messageList.forEach((item, key) => {
      const findIndex = state.list.findIndex(
        (item) => item.from_uid === key || item.to_uid === key
      )
      if (findIndex === -1) {
        state.list.push({
          ...transferData(item.list[0]),
          count: item.count,
          userinfo: item.list[0].userinfo
        })
      } else {
        state.list[findIndex] = {
          ...transferData(item.list[0]),
          count: item.count,
          userinfo: item.list[0].userinfo
        }
      }
    })
  }
  setMessageCount()
  return new Promise((resolve, reject) => {
    resolve()
  })
}
function messageClick(data, index) {
  const key = data.userinfo._id
  // 修改与用户的已读状态
  handleMessageRead(key)
  openUserChat(key)
}
function handleMessageRead(key) {
  const index = state.list.findIndex((item) => item.userinfo._id === key)
  state.list[index].count = 0

  const temp = messageList.get(key)
  // 本地数据修改为已读
  const list = temp.list.map((item) => {
    item.is_read = '1'
    return item
  })
  messageList.set(key, {
    list,
    count: 0
  })
  storage.setItem(uid + 'messageList', Object.fromEntries(messageList))
  setMessageCount()
  setReadMessage(key)
}
// 设置tab未读数量
function setMessageCount() {
  let count = 0
  state.list.forEach((item, key) => {
    count += item.count
  })
  store.setCount(count)
}
// 发送成功后更新列表
emitter.on('send_message', (data) => {
  handleMessageData([data], data.to_uid, 'io')
})
// 接收后更新列表
emitter.on('message', (data) => {
  console.log(data)
  handleMessageData([data], '', 'io').then(() => {
    // 修改与用户的已读状态
    if (router.currentRoute.value.name === 'chat') {
      handleMessageRead(data.from_uid)
    }
  })
  emitter.emit('chat_message' + data.from_uid, data)
})
</script>
<template>
  <van-nav-bar
    title="chat"
    :right-text="'查找用户'"
    fixed
    @click-right="router.push('search')"
  />
  <div class="message">
    <van-empty description="空空如也" v-if="state.list.length === 0" />
    <ul class="message_list" v-else>
      <li
        class="message_item"
        v-for="(item, index) in state.list"
        @click="messageClick(item, index)"
        :style="{
          order: `-${item.timestamp}`
        }"
      >
        <user-avatar :name="item.userinfo.username" round />
        <div class="message_item_box van-hairline--bottom">
          <div class="name" v-text="item.userinfo.username"></div>
          <div class="content">
            {{ item.content }}
          </div>
          <div class="addtime" v-html="item.addtime"></div>
          <van-badge
            v-show="item.count > 0"
            class="badge"
            :content="item.count"
          >
          </van-badge>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="less">
.message_list {
  padding-top: 44px;
  display: flex;
  flex-direction: column;
  .message_item {
    padding: 0 16px;
    height: 60px;
    display: flex;
    align-items: center;
    &:active {
      background-image: linear-gradient(
        rgba(0, 0, 0, 0.05),
        rgba(0, 0, 0, 0.05)
      );
    }
    .badge {
      position: absolute;
      top: auto;
      right: 16px;
      bottom: 0;
    }
  }
  .message_item_box {
    margin-left: 12px;
    width: calc(100% - (44px + 12px));
    flex-grow: 1;
    position: relative;
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    .name {
      font-size: 14px;
      color: #191919;
      font-weight: bold;
    }
    .content {
      width: 85%;
      font-size: 12px;
      color: #b1b1b1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .addtime {
      position: absolute;
      font-size: 12px;
      color: #b1b1b1;
      top: 10px;
      right: 0;
    }
  }
}
</style>
