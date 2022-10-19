<script setup>
import { openUserChat } from '@/utils/user.js'
import { getMessage, setReadMessage } from '@/api/user.js'
import { transferData } from '@/utils/message.js'
import { useMessageStore } from '@/store/index.js'
import storage from '@/utils/storage.js'
import emitter from '@/utils/bus.js'
import router from '@/router'

const uid = storage.getItem('userInfo')._id
const store = useMessageStore()
const storageMessageList = storage.getItem(uid + 'messageList') || {}
let messageList = new Map()
let state = reactive({
  list: []
})
onMounted(() => {
  // 先拿本地缓存数据
  if (storageMessageList) {
    handleMessageData(storageMessageList)
  }
  最后一条数据的记录时间
  const time = storage.getItem(uid + 'messageStartTime') || 0
  getMessage({ time }).then((res) => {
    const { data } = res
    if (data.length === 0) {
      return
    }
    handleMessageData(data)
  })
})
function handleMessageData(data, keyVal) {
  for (let index = 0; index < data.length; index++) {
    const item = data[index]
    const key = keyVal || item.from_uid === uid ? item.to_uid : item.from_uid
    const temp = messageList.get(key)
    let count = !temp ? 0 : temp.count
    if (item.from_uid !== uid && Number.parseInt(item.is_read) === 0) {
      count = count + 1
    }
    messageList.set(key, {
      list: temp ? [...temp.list, item] : [item],
      count
    })
  }
  // Object.fromEntries
  storage.setItem(
    uid + 'messageList',
    storageMessageList ? [...storageMessageList, ...data] : data
  )
  storage.setItem(uid + 'messageStartTime', data[0].createTime)
  setMessageCount()
  if (keyVal) {
    data.forEach((item) => {
      const findIndex = state.list.findIndex(
        (item) => item.from_uid === keyVal || item.to_uid === keyVal
      )
      state.list[findIndex] = {
        ...transferData(item),
        count: item.count,
        userinfo: item.userinfo
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
}
function messageClick(data, index) {
  state.list[index].count = 0
  sessionStorage.setItem(
    'chat' + data.userinfo._id,
    JSON.stringify(messageList.get(data.userinfo._id))
  )
  setReadMessage(data.userinfo._id)
  openUserChat(data.userinfo._id)
  setMessageCount()
}
function setMessageCount() {
  let count = 0
  state.list.forEach((item, key) => {
    count += item.count
  })
  store.setCount(count)
}
// 发送成功后更新列表
emitter.on('send_message', (data) => {
  handleMessageData([data], data.to_uid)
})
// 接收后更新列表
emitter.on('message', (data) => {
  const key = data.from_uid === uid ? data.to_uid : data.from_uid
  handleMessageData([data], key)
  setMessageCount()
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
    <ul class="message_list">
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
      width: 100%;
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
