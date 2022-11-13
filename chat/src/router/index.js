import { createRouter, createWebHashHistory } from 'vue-router'
import { useMainStore } from '@/store/index.js'
import storage from '../utils/storage.js'
import routes from '~pages'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  window.document.title = `iChat`
  if (to.path === '/login') {
    return next()
  }
  const userInfo = storage.getItem('userInfo') || {}
  if (!userInfo.token) {
    return next('/login')
  }
  if (userInfo.token) {
    const store = useMainStore()
    store.setUserInfo(userInfo)
    if (!store.indexDBOpen) {
      store.initDb()
    }
    if (JSON.stringify(store.ws) === '{}') {
      store.initWebSocket()
    }
  }

  if (from.path === '/login' && to.path === '/message') {
    to.meta.keepAlive = false
  }
  next()
})
export default router
