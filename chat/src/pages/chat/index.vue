<script setup>
import { useRoute, useRouter } from 'vue-router'
import emitter from '../../utils/bus.js'
import storage from '../../utils/storage.js'
import { message } from '../../api/user.js'

const router = useRouter()
const userInfo = storage.getItem('userInfo')
const route = useRoute()
const content = ref('')
function onClickLeft() {
  router.back()
}
function sendMessage() {
  if (!content.value) return
  const params = {
    content_type: 1,
    content: content.value,
    to_uid: route.query._id,
    from_uid: userInfo._id
  }
  console.log(params)
  message(params).then((res) => {
    console.log(res)
    content.value = ''
  })
  // emitter.emit('send_message', {
  //   content_type: 1,
  //   content: content.value,
  //   to_uid: route.query._id,
  //   from_uid: userInfo._id
  // })
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
          v-model="content"
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
