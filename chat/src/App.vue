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
    socket = io(import.meta.env.VITE_WS_URL, {
      auth: {
        username: userInfo.username,
        id: userInfo._id,
        token: userInfo.token
      }
    })
    socket.on('message', (data) => {
      emitter.emit('message', data)
      emitter.emit('chat_message' + data.from_uid, data)
    })
    // socket.on('ping', () => {
    //   console.log(1)
    // })
    // socket.on('connect', function () {
    //   console.log('客户端和服务端建立连接了')
    //   ping()
    // })

    // socket.on('disconnect', function () {
    //   console.log('客户端和服务端断开连接了')
    //   clearInterval(interval)
    // })
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
  socket.close()
  socket = null
  closeIndexDB()
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
