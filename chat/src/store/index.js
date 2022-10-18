import { defineStore } from 'pinia'
export const useUserInfoStore = defineStore('userinfo', {
  state: () => {
    return {
      userinfo: {}
    }
  },
  getters: {},
  actions: {
    setUseInfo(data) {
      this.userinfo = data
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
