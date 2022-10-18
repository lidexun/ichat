import { createApp } from 'vue'
import './assets/app.css'
import App from './App.vue'
import router from './router/index'
import { Toast } from 'vant'
import 'vant/es/toast/style'
import components from './components/index.js'
import { createPinia } from 'pinia'
const app = createApp(App)
const pinia = createPinia()
app.use(Toast)
app.use(router)
app.use(pinia)
app.use(components)
app.mount('#app')
