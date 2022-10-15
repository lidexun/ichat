import { createRouter, createWebHashHistory } from 'vue-router'

import storage from '../utils/storage.js'
import routes from '~pages'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  window.document.title = `iChat聊天室`
  if (to.path === '/login') return next()
  const token = storage.getItem('token')
  if (!token) {
    next('/login')
    return
  }
  next()
})
export default router
