<script setup>
import { login, register } from '../../api/user.js'
import loginForm from './components/login_form.vue'
import router from '../../router/index.js'
import storage from '../../utils/storage.js'
import { Toast } from 'vant'
const type = ref('login')
const setType = (value) => {
  type.value = value
}
const submit = async (data) => {
  Toast.loading({
    message: '',
    forbidClick: true
  })
  if (data.type === 'register') {
    const res = await register(data)
    Toast.clear()
  } else {
    const res = await login(data)
    Toast.clear()
    storage.setItem('userInfo', res.data)
    storage.setItem('token', res.data.token)
    Toast({
      message: '登录成功',
      onOpened: () => {
        router.push('/chat')
      }
    })
  }
}
</script>

<template>
  <van-nav-bar
    :left-arrow="type !== 'login'"
    :title="type === 'login' ? '登录' : '注册'"
    :right-text="type === 'login' ? '注册' : ''"
    @click-left="setType('login')"
    @click-right="setType('register')"
  />
  <loginForm
    @submit="submit"
    v-show="type === 'login'"
    key="login"
    :type="type"
  ></loginForm>
  <loginForm
    @submit="submit"
    v-show="type === 'register'"
    key="register"
    :type="type"
  ></loginForm>
</template>
