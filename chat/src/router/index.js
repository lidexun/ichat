import { createRouter, createWebHashHistory } from 'vue-router'

import storage from '../utils/storage.js'
import routes from '~pages'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  window.document.title = `iChat`
  if (to.path === '/login') return next()
  const userInfo = storage.getItem('userInfo') || {}
  const token = userInfo.token
  if (!token) {
    next('/login')
    return
  }
  if (from.path === '/login' && to.path === '/message') {
    to.meta.keepAlive = false
  }
  next()
})
export default router
