<script setup>
import { initIndexDB, closeIndexDB } from '@/utils/indexDB.js'
import { useUserInfoStore, useMainStore } from '@/store/index.js'
import emitter from '@/utils/bus.js'
import storage from '@/utils/storage.js'
const store = useUserInfoStore()
const mainStore = useMainStore()
let userInfo = undefined
let socket = null
onMounted(() => {
  init()
})
// 登陆后连接ws
emitter.on('login', () => {
  init()
})
emitter.on('login_out', (data) => {
  closeIndexDB()
  socket.close()
  socket = null
})
function init() {
  if (!store.getUserInfo) {
    return
  }
  userInfo = storage.getItem('userInfo')
  initIndexDB('im_' + userInfo._id).then(() => {
    socket = new WebSocket(import.meta.env.VITE_WS_URL + '/ws/user', [
      userInfo._id
    ])
    socket.onopen = (e) => {
      mainStore.indexDBOpen = true
    }
    socket.onmessage = (e) => {
      const { type, data } = JSON.parse(e.data)
      switch (type) {
        case 'message':
          emitter.emit('message', data)
          emitter.emit('chat_message', data)
          break
        default:
          break
      }
    }
  })
}
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component
        :is="Component"
        :key="$route.name"
        v-if="$route.meta.keepAlive"
      />
    </keep-alive>
    <component
      :is="Component"
      :key="$route.name"
      v-if="!$route.meta.keepAlive"
    />
  </router-view>
</template>
