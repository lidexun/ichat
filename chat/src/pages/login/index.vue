<script setup>
import { login, register } from '@/api/user.js'
import loginForm from './components/login_form.vue'
import router from '@/router/index.js'
import storage from '@/utils/storage.js'
import { useUserInfoStore } from '@/store/index.js'

import { Toast } from 'vant'
const type = ref('login')
const setType = (value) => {
  type.value = value
}
const submit = async (data) => {
  if (!data.username || !data.password) {
    await Toast('请输入正确的用户或密码')
    return
  }
  Toast.loading({
    message: '',
    forbidClick: true
  })
  try {
    let res = null
    if (data.type === 'register') {
      res = await register(data)
    } else {
      res = await login(data)
    }
    const store = useUserInfoStore()
    store.setUseInfo(res.data)
    storage.setItem('userInfo', res.data)
    router.push('/')
    Toast.clear()
  } catch {}
}
</script>

<template>
  <van-nav-bar
    :left-arrow="type !== 'login'"
    :title="type === 'login' ? '' : '注册'"
    :right-text="type === 'login' ? '注册' : ''"
    @click-left="setType('login')"
    @click-right="setType('register')"
    :border="false"
  />
  <div class="login_logo">
    <van-image class="logo" width="58" height="58" src="icon.svg" />
    <div>iChat 一款聊天应用</div>
  </div>
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
<style lang="less" scoped>
.login_logo {
  display: flex;
  justify-content: center;
  margin-top: 80px;
  margin-bottom: 30px;
  flex-direction: column;
  align-items: center;
  .logo {
    border-radius: 10px;
  }
}
</style>
