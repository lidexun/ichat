<script setup>
import { useRoute, useRouter } from 'vue-router'
import emitter from '../../utils/bus.js'
import storage from '../../utils/storage.js'
import { message } from '../../api/user.js'
import { transferData } from '@/utils/message.js'
import { useMessageStore } from '@/store/index.js'
const store = useMessageStore()

const router = useRouter()
const route = useRoute()
const userInfo = storage.getItem('userInfo')
// const taUserInfo = ref(null)
const messageList = new Map(
  Object.entries(storage.getItem(userInfo._id + 'messageList'))
)
let page = 1
let limit = 10
let isLoading = ref(false)
let content = ref('')
let content_input = ref(null)
let main = ref(null)
let chatList = ref([])

onMounted(() => {
  const temp = messageList
    .get(route.query._id)
    .sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime))
  // console.log(temp)
  // page * limit
  const begin = (page - 1) * limit
  const end = page * limit
  // // 初始化
  chatList.value = temp.slice(begin, end).map((item) => transferData(item))
  scrollBottom()
})

function scrollBottom() {
  nextTick(() => {
    main.value.scrollTop = 99999999999
  })
}
function contentInput(e) {
  content.value = e.target.innerHTML
}
function sendMessage() {
  if (!content.value) return
  let contentT = content_input.value.innerText
    .replace(/↵/g, '<br/>')
    .replace(/\n/g, '<br/>')
    .replace(/\s/g, '&nbsp;')

  const params = {
    content_type: 1,
    content: contentT,
    to_uid: route.query._id,
    from_uid: userInfo._id
  }
  message(params).then((res) => {
    chatList.value.push(res.data)
    emitter.emit('send_message', res.data)
    content_input.value.textContent = ''
    content.value = ''
    scrollBottom()
  })
}
function onRefresh() {}
</script>
<template>
  <div class="chat">
    <header class="header">
      <van-nav-bar left-arrow @click-left="router.back()" />
    </header>
    <main class="main" ref="main">
      <van-pull-refresh
        v-model="isLoading"
        :pulling-text="''"
        :loosing-text="''"
        :loading-text="''"
        @refresh="onRefresh"
      >
        <ul class="chat_list">
          <li
            v-for="(item, index) in chatList"
            class="chat_list_item"
            :class="{
              on: item.from_uid === userInfo._id
            }"
            :style="{
              order: `${Math.round(new Date(item.createdTime) / 1000)}`
            }"
          >
            <user-avatar
              :width="'38px'"
              :height="'38px'"
              :name="
                item.from_uid === userInfo._id
                  ? userInfo.username
                  : item.userinfo.username
              "
              round
            />
            <div class="chat_list_content">
              <div class="content" v-html="item.contentCopy"></div>
            </div>
          </li>
        </ul>
      </van-pull-refresh>
    </main>
    <footer class="footer">
      <div class="emoji">
        <van-icon name="smile-o" size="30" />
      </div>
      <div class="content">
        <div
          ref="content_input"
          class="input"
          contenteditable
          style="-webkit-user-select: auto"
          @input="contentInput"
          placeholder="请输入文字"
        ></div>
      </div>
      <div class="button">
        <van-button
          size="small"
          :disabled="content.length > 0 ? false : true"
          type="primary"
          @click="sendMessage"
          >发送</van-button
        >
      </div>
    </footer>
  </div>
</template>
<style lang="less" scoped>
.chat {
  height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-flow: column;
}
.main {
  flex: 1;
  background-color: #ededed;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
.footer {
  flex-flow: column;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  background-color: var(--van-white);
  .emoji {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    // background-color: #000;
  }
  .content {
    flex: 1;
    padding: 8px 0;
    align-self: flex-end;
    .input {
      padding: 3px 8px;
      background-color: #fff;
      min-height: 20px;
      max-height: 70px;
      font-size: 16px;
      line-height: 1.5;
      border-radius: 8px;
      overflow-x: hidden;
      overflow-y: auto;
      outline: none;
      border: 1px solid #ecebeb;
      background-color: #ededed;
      width: 97%;
      margin: 0 auto;
      word-wrap: break-word;
      word-break: break-all;
    }
    .content_input {
      font-size: 16px;
      padding: 0;
      height: 38px;
      border: none;
      resize: none;
      width: 100%;
      background-color: #ededed;
      // background-color: var(--van-white);
      // background-color: #ac3737;
      padding: 6px;

      display: inline-block;
      border-radius: 4px;
    }
  }
  .button {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.chat_list {
  margin: 12px;
  display: flex;
  flex-direction: column;
  .chat_list_item {
    margin-top: 12px;
    display: flex;
    &.on {
      justify-content: flex-start;
      flex-direction: row-reverse;
      .chat_list_content {
        margin-left: 0;
        margin-right: 12px;
        background-color: var(--van-blue);
        color: var(--van-white);
        max-width: 70%;
        word-wrap: break-word;
      }
    }
    .chat_list_content {
      margin-left: 12px;
      background-color: var(--van-white);
      min-height: 37px;
      padding: 6px 12px;
      font-size: 16px;
      border-radius: 8px;
    }
  }
}
</style>
