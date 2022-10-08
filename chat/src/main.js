import { createApp } from 'vue'
import './assets/app.css'
import App from './App.vue'
import router from './router/index'
import { Toast } from 'vant'
import 'vant/es/toast/style'

const app = createApp(App)
app.use(Toast)
app.use(router)
app.mount('#app')
