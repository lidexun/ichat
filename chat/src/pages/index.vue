<route>
{
  redirect: "message",
}
</route>
<script setup>
import { io } from 'socket.io-client'
import emitter from '../utils/bus.js'
import storage from '../utils/storage.js'
const userInfo = storage.getItem('userInfo')

const socket = io('ws://localhost:6001', {
  auth: {
    username: userInfo.username,
    id: userInfo._id,
    token: userInfo.token
  }
})
emitter.on('send_message', (data) => {
  console.log(data)
  socket.emit('message', data.message, data.fromid, data.toid)
})
socket.on('message', (data, fromid, type) => {
  console.log(data, type)
  // messageList.value.push(ags)
})
onUnmounted(() => {
  socket.close()
})
const active = ref('message')
const list = reactive([
  {
    name: 'message',
    icon: 'comment-o',
    text: '聊天'
  },
  {
    name: 'user',
    icon: 'user-o',
    text: '我的'
  }
])
</script>
<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <van-tabbar v-model="active" route>
    <van-tabbar-item
      v-for="(item, index) in list"
      :to="'/' + item.name"
      :key="item.name + item.icon"
      :name="item.name"
      :icon="item.icon"
      >{{ item.text }}</van-tabbar-item
    >
  </van-tabbar>
</template>
