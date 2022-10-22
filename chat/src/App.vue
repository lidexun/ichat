<script setup>
import { io } from 'socket.io-client'
import emitter from '@/utils/bus.js'
import storage from '@/utils/storage.js'
let userInfo = storage.getItem('userInfo')
let socket = null
// 登陆后连接ws
emitter.on('login', () => {
  init()
})
if (userInfo && socket === null) {
  init()
}
function init() {
  userInfo = storage.getItem('userInfo')
  socket = io(import.meta.env.VITE_WS_URL, {
    auth: {
      username: userInfo.username,
      id: userInfo._id,
      token: userInfo.token
    }
  })
  socket.on('message', (data) => {
    emitter.emit('message', data)
  })
}
// 断开ws
emitter.on('login_out', (data) => {
  socket.close()
  socket = null
})
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive>
      <component :is="Component" v-if="route.meta.keepAlive" />
    </keep-alive>
    <component :is="Component" v-if="!route.meta.keepAlive" />
  </router-view>
</template>
