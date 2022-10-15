<route>
{
  redirect: "message",
  meta: {
    keepAlive: true
  }
  
}
</route>
<script setup>
import { io } from 'socket.io-client'
import emitter from '../utils/bus.js'
import storage from '../utils/storage.js'
const userInfo = storage.getItem('userInfo')

const socket = io(import.meta.env.VITE_WS_URL, {
  auth: {
    username: userInfo.username,
    id: userInfo._id,
    token: userInfo.token
  }
})
socket.on('message', (data) => {
  emitter.emit('message', data)
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
