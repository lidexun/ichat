import { defineStore } from 'pinia'
import storage from '@/utils/storage.js'
export const useUserInfoStore = defineStore('useInfo', {
  state: () => {
    return {
      userInfo: storage.getItem('userInfo')
    }
  },
  getters: {},
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
    // return {
    //   isLogin: 0
    // }
  },
  getters: {
    isLogin(state) {
      return state.count === 0 ? null : state.count
    }
  },
  actions: {
    setCount(data) {
      this.count = data
    }
  }
})
