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
function onSubmit(val) {
  emit('submit', {
    type: props.type,
    ...form
    // email: form.email,
    // username: form.username,
    // password: form.password
  })
}
function validator(val) {
  const reg = /^\d{6,20}$/
  return reg.test(val)
}

function validatoEmail(val) {
  console.log(val)
  const reg =
    /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/
  return reg.test(val)
}
function validatoPassword(val) {
  const reg = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\-\_\~\(\)]{6,20}$/
  return reg.test(val)
}
</script>

<template>
  <div class="login">
    <van-space :size="16" direction="vertical" fill>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-if="type === 'register'"
            style="font-size: 16px"
            type="email"
            size="large"
            v-model="form.email"
            name=""
            label=""
            placeholder="邮箱"
            center
            :rules="[
              {
                validator: validatoEmail,
                required: true,
                message: '请填写的邮箱'
              }
            ]"
          />
          <van-field
            style="font-size: 16px"
            size="large"
            v-model="form.username"
            name=""
            label=""
            placeholder="用户名"
            center
            :rules="[
              {
                validator,
                required: true,
                message: '请填写用户名,不能少于6位数'
              }
            ]"
          />
          <van-field
            style="font-size: 16px"
            size="large"
            v-model="form.password"
            type="password"
            name=""
            label=""
            placeholder="密码"
            center
            clearable
            :rules="[
              {
                validator: validatoPassword,
                required: true,
                message: '请填写密码,不能少于6位数'
              }
            ]"
          />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button
            class="login_button"
            native-type="submit"
            type="primary"
            round
            block
            >{{ type === 'login' ? '登录' : '注册' }}</van-button
          >
        </div>
      </van-form>
    </van-space>
  </div>
</template>

<style scoped lang="less">
.login {
  // padding: 0 28px 0;
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
    height: 44px;
    padding: 0 14px;
    background: rgba(240, 240, 240, 1);
    border-radius: 18px;
    z-index: 1;
    font-size: 14px;
    transition: 0.3s cubic-bezier(0.1, 0.2, 0.3, 1);
    &:focus {
      border-color: var(--van-blue);
    }
  }
  .login_button {
    font-size: 16px;
  }
}
</style>
