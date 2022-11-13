import { defineStore } from 'pinia'
import { initIndexDB, closeIndexDB } from '@/utils/indexDB.js'
import webSocketClient from '@/utils/websoket.js'

export const useMainStore = defineStore('main', {
  state: () => {
    return {
      userInfo: undefined,
      indexDBOpen: false,
      messageCount: 0,
      ws: {}
    }
  },
  getters: {
    getUserInfo(state) {
      return state.userInfo || storage.getItem('userInfo')
    },
    getCount(state) {
      return state.messageCount === 0 ? null : state.messageCount
    }
  },
  actions: {
    async initDb() {
      await initIndexDB('im_' + this.userInfo._id).then(() => {
        this.indexDBOpen = true
      })
    },
    initWebSocket() {
      this.ws = new webSocketClient(import.meta.env.VITE_WS_URL + '/ws/user', [
        this.userInfo.token
      ])
      this.ws.init()
      console.log(this.ws)
    },
    setCount(data) {
      this.count = data
    },
    setUserInfo(data) {
      this.userInfo = data
    },
    loginOut() {
      closeIndexDB()
      this.ws.onclose()
      this.indexDBOpen = false
      this.userInfo = undefined
    }
  }
})
