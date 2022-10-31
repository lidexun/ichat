import { defineStore } from 'pinia'
import storage from '@/utils/storage.js'
export const useUserInfoStore = defineStore('useInfo', {
  state: () => {
    return {
      userInfo: undefined
    }
  },
  getters: {
    getUserInfo(state) {
      return state.userInfo || storage.getItem('userInfo')
    }
  },
  actions: {
    setUserInfo(data) {
      this.userInfo = data
    }
  }
})

export const useMessageStore = defineStore('message', {
  state: () => {
    return {
      count: 0
    }
  },
  getters: {
    getCount(state) {
      return state.count === 0 ? null : state.count
    }
  },
  actions: {
    setCount(data) {
      this.count = data
    }
  }
})
export const useMainStore = defineStore('main', {
  state: () => {
    return {
      indexDBOpen: false,
      webSocket: false
    }
  }
})
