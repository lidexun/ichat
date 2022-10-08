import { createRouter, createWebHistory } from 'vue-router'

import storage from '../utils/storage.js'
import routes from '~pages'

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  window.document.title = `聊天室`
  if (to.path === '/login') return next()
  const token = storage.getItem('token')
  if (!token) {
    next('/login')
  }
  next()
  // 返回 false 以取消导航
})
export default router
