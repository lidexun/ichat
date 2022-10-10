// import { useRouter } from 'vue-router'
import router from '../router'

export function openUserChat(_id) {
  router.push({
    path: '/chat',
    query: {
      _id
    }
  })
}
