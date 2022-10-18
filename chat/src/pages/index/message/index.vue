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
let state = reactive({
  list: []
})
let messageList = new Map()
let messageCount = new Map()
getMessage().then((res) => {
  const { data } = res
  for (let index = 0; index < data.length; index++) {
    const item = data[index]
    // 总一下未读消息
    if (item.from_uid !== uid && Number.parseInt(item.is_read) === 0) {
      const temp = messageCount.get(item.from_uid)
      if (messageCount.get(item.from_uid)) {
        messageCount.set(item.from_uid, temp + 1)
      } else {
        messageCount.set(item.from_uid, 1)
      }
    }
    const key = item.from_uid === uid ? item.to_uid : item.from_uid
    let temp = messageList.get(key)
    if (temp) {
      messageList.set(key, [...temp, item])
    } else {
      messageList.set(key, [item])
    }
  }
  storage.setItem(uid + 'messageList', Object.fromEntries(messageList))
  messageList.forEach((item, key) => {
    state.list.push({
      ...transferData(item[0]),
      count: messageCount.get(key)
    })
  })
  setMessageCount()
})
function messageClick(data, index) {
  messageCount.set(data.userinfo._id, 0)
  state.list[index].count = 0
  setMessageCount()
  setReadMessage(data.userinfo._id)
  openUserChat(data.userinfo._id)
}
function setMessageCount() {
  let count = 0
  messageCount.forEach((item, key) => {
    count += item
  })
  store.setCount(count)
}
// 发送成功后更新列表
emitter.on('send_message', (data) => {
  const key = data.to_uid
  let temp = messageList.get(key)
  if (temp) {
    messageList.set(key, [...temp, data])
  } else {
    messageList.set(key, [data])
  }
  storage.setItem(uid + 'messageList', Object.fromEntries(messageList))
  const findIndex = state.list.findIndex(
    (item) => item.from_uid === key || item.to_uid === key
  )
  state.list[findIndex] = {
    ...transferData(data),
    userinfo: data.userinfo
  }
})
// 接收后更新列表
emitter.on('message', (data) => {
  const key = data.from_uid === uid ? data.to_uid : data.from_uid
  let temp = messageList.get(key)
  let count = messageCount.get(key)
  if (temp) {
    messageList.set(key, [...temp, data])
    messageCount.set(key, count + 1)
  } else {
    messageList.set(key, [data])
    messageCount.set(key, 1)
  }
  const findIndex = state.list.findIndex(
    (item) => item.from_uid === key || item.to_uid === key
  )
  state.list[findIndex] = {
    ...transferData(data),
    count: messageCount.get(key),
    userinfo: data.userinfo
  }
  setMessageCount()
  storage.setItem(uid + 'messageList', Object.fromEntries(messageList))
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
