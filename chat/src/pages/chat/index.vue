<script setup>
import { useRoute, useRouter } from 'vue-router'
import emitter from '../../utils/bus.js'
import storage from '../../utils/storage.js'

const router = useRouter()
const userInfo = storage.getItem('userInfo')
const route = useRoute()
const message = ref('')
function onClickLeft() {
  router.back()
}
function sendMessage() {
  emitter.emit('send_message', {
    message: message.value,
    toid: route.query._id,
    fromid: userInfo._id
  })
}
</script>
<template>
  <div class="chat">
    <header class="header">
      <van-nav-bar
        title="标题"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </header>
    <main class="main">&nbsp;</main>
    <footer class="footer">
      <van-cell-group inset>
        <van-field
          v-model="message"
          center
          clearable
          label="文本"
          placeholder="文本"
        >
          <template #button>
            <van-button size="small" type="primary" @click="sendMessage"
              >发送</van-button
            >
          </template>
        </van-field>
      </van-cell-group>
    </footer>
  </div>
</template>
<style lang="less">
.chat {
  height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-flow: column;
  .main {
    flex: 1;
  }
  .footer {
    flex-flow: column;
  }
}
</style>
