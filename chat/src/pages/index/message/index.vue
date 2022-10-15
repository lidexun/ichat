<script setup>
import { openUserChat } from '../../../utils/user.js'
import { getMessage } from '../../../api/user.js'
import storage from '../../../utils/storage.js'
import emitter from '../../../utils/bus.js'

import router from '../../../router'
let state = reactive({
  messageList: []
})
const uid = storage.getItem('userInfo')._id
const map = new Map()
function dateFormat(t) {
  var nowDate = new Date()
  if (t) {
    // t = t * 1000
    nowDate = new Date(t)
  }
  var year = nowDate.getFullYear()
  var month =
    nowDate.getMonth() + 1 < 10
      ? '0' + (nowDate.getMonth() + 1)
      : nowDate.getMonth() + 1
  var date =
    nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate.getDate()
  var hour =
    nowDate.getHours() < 10 ? '0' + nowDate.getHours() : nowDate.getHours()
  var minute =
    nowDate.getMinutes() < 10
      ? '0' + nowDate.getMinutes()
      : nowDate.getMinutes()
  var second =
    nowDate.getSeconds() < 10
      ? '0' + nowDate.getSeconds()
      : nowDate.getSeconds()
  return year + '-' + month + '-' + date + ' ' + hour + ':' + minute
}
getMessage().then((res) => {
  const { data } = res
  const users = []
  for (let index = 0; index < data.length; index++) {
    const item = data[index]
    const key = item.from_uid === uid ? item.to_uid : item.from_uid
    let temp = map.get(key)
    if (temp) {
      map.set(key, [...temp, item])
    } else {
      users.push(key)
      map.set(key, [item])
    }
  }
  storage.setItem('messageList', Object.fromEntries(map))
  map.forEach((item, key) => {
    state.messageList.push(tranfData(item[0]))
  })
})

function tranfData(data) {
  const tempData = data
  tempData.content = tempData.content
    .replace(/&amp;/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/<br\/>/g, ' ')
  tempData.addtime = dateFormat(data.createdTime)
  tempData.timestamp = Math.round(new Date(data.createdTime) / 1000)
  return tempData
}
emitter.on('send_message', (data) => {
  const key = data.to_uid
  let temp = map.get(key)
  if (temp) {
    map.set(key, [...temp, data])
  } else {
    map.set(key, [data])
  }
  storage.setItem('messageList', Object.fromEntries(map))
  const findIndex = state.messageList.findIndex((item) => {
    return item.from_uid === key || item.to_uid === key
  })
  state.messageList[findIndex] = {
    ...tranfData(data),
    userinfo: data.userinfo
  }
})
emitter.on('message', (data) => {
  const key = data.from_uid === uid ? data.to_uid : data.from_uid
  let temp = map.get(key)
  if (temp) {
    map.set(key, [...temp, data])
  } else {
    map.set(key, [data])
  }
  storage.setItem('messageList', Object.fromEntries(map))
  state.messageList = state.messageList.map((item, index) => {
    if (item.from_uid === data.from_uid) {
      return {
        ...tranfData(data),
        userinfo: item.userinfo
      }
    }
    return item
  })
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
        v-for="(item, index) in state.messageList"
        @click="openUserChat(item.userinfo._id)"
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
