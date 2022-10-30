<script setup>
import { io } from 'socket.io-client'
import { initIndexDB, closeIndexDB } from '@/utils/indexDB.js'
import emitter from '@/utils/bus.js'
import storage from '@/utils/storage.js'
let userInfo = storage.getItem('userInfo')
let socket = null
// let interval = null
// 登陆后连接ws
emitter.on('login', () => {
  init()
})
if (userInfo && socket === null) {
  init()
}
function init() {
  userInfo = storage.getItem('userInfo')
  initIndexDB('im_' + userInfo._id).then(() => {
    socket = new WebSocket(import.meta.env.VITE_WS_URL + '/ws/user', [
      userInfo._id
    ])
    socket.onopen = function (e) {
      console.log(e)
    }
    socket.onmessage = (e) => {
      const { type, data } = JSON.parse(e.data)
      switch (type) {
        case 'message':
          emitter.emit('message', data)
          emitter.emit('chat_message' + data.from_uid, data)
          break
        default:
          break
      }
    }
  })
}
// function ping() {
//   interval = setInterval(function () {
//     console.log('ping')
//     socket.emit('ping', {})
//   }, 5 * 1000)
// }
// 断开ws
emitter.on('login_out', (data) => {
  closeIndexDB()
  socket.close()
  socket = null
})
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive :include="['index-message', 'index-user']">
      <component :is="Component" />
    </keep-alive>
    <!-- <component :is="Component" v-if="!route.meta.keepAlive" /> -->
  </router-view>
</template>
