<script setup>
const emit = defineEmits(['submit'])
const props = defineProps({
  type: {
    type: String,
    default: 'login'
  }
})
const form = reactive({
  email: '',
  username: '',
  password: ''
})
function buttonClick() {
  emit('submit', {
    type: props.type,
    ...form
  })
}
</script>

<template>
  <div class="login">
    <van-space :size="16" direction="vertical" fill>
      <input
        v-show="type === 'register'"
        class="login_input"
        v-model="form.email"
        aria-invalid="true"
        autocomplete="off"
        name="account"
        placeholder="请输入邮箱"
        type="email"
      />
      <input
        class="login_input"
        v-model="form.username"
        aria-invalid="true"
        autocomplete="off"
        name="account"
        placeholder="请输入用户名"
        type="text"
      />
      <input
        class="login_input"
        v-model="form.password"
        aria-invalid="true"
        autocomplete="off"
        name="account"
        placeholder="请输入密码"
        type="password"
      />
      <van-button
        class="login_button"
        type="primary"
        @click="buttonClick"
        round
        block
        >{{ type === 'login' ? '登录' : '注册' }}</van-button
      >
      <!-- <van-button class="login_button" @click="submitLogin" round block
        >我要注册</van-button
      > -->
    </van-space>
  </div>
</template>

<style scoped lang="less">
.login {
  padding: 80px 28px 0;
  // .login_input {
  //   margin-top: 16px;
  //   position: relative;
  //   width: 100%;
  //   display: inline-flex;
  //   align-items: center;
  .login_input {
    position: relative;
    display: block;
    width: 100%;
    border: 2px solid rgba(240, 240, 240, 1);
    height: 55px;
    padding: 0 14px;
    background: rgba(240, 240, 240, 1);
    border-radius: 18px;
    z-index: 1;
    font-size: 16px;
    transition: 0.3s cubic-bezier(0.1, 0.2, 0.3, 1);
    &:focus {
      border-color: var(--van-blue);
    }
  }
  .login_button {
    height: 48px;
    font-size: 18px;
  }
}
</style>
