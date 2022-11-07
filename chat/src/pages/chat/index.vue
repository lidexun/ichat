<script setup>
import { useRoute, useRouter } from 'vue-router'
import { sendMessage, getTaUserInfo, setReadMessage } from '../../api/user.js'
import { transferData, dateFormat, timestamp } from '@/utils/message.js'
import emitter from '../../utils/bus.js'
import storage from '../../utils/storage.js'
import { debounce } from '../../utils/index.js'

import {
  addIndexDB,
  readIndexDB,
  updateIndexDB,
  readAllMsgIndexDB
} from '@/utils/indexDB.js'

const router = useRouter()
const route = useRoute()
const userInfo = storage.getItem('userInfo')
const taUserInfo = ref({})
let page = 1
let limit = 15
let content = ref('')
let content_input = ref(null)
let times = new Map()
let chat = reactive({
  list: [],
  listEnding: false,
  isLoading: false
})
let messageList = []

const init = async () => {
  const res = await getTaUserInfo(route.query._id)
  taUserInfo.value = res.data[0]
  messageList = await readAllMsgIndexDB(
    'messageStore',
    'chatKey',
    route.query._id
  )
  chatMoveData()
  chatScrollTop()
}
const chatMoveData = async () => {
  if (chat.listEnding) {
    return
  }
  const begin = (page - 1) * limit
  const end = page * limit
  const tempTimes = []
  const list = messageList
    .sort((a, b) => new Date(b.createTime) - new Date(a.createTime))
    .slice(begin, end)
    .map((item) => {
      let tempAddTime = dateFormat(item.createTime).split(' ')
      if (!times.get(tempAddTime[0])) {
        times.set(tempAddTime[0], 1)
        tempTimes.push({
          type: 2,
          addtime: tempAddTime[0],
          timestamp: Math.round(+new Date(`${tempAddTime[0]} 00:00:00`) / 1000)
        })
      }
      return transferData(item)
    })

  if (chat.list.length < limit) {
    chat.listEnding = true
  }
  chat.list = chat.list.concat(list, tempTimes)
  page++
}
function chatScrollTop(top = 999999) {
  nextTick(() => {
    document.documentElement.scrollIntoView(false)
  })
}
function contentInput(e) {
  if (e.target.innerHTML === '<br>') {
    content.value = ''
  } else {
    content.value = e.target.innerHTML
  }
}
function sendContent() {
  content_input.value.focus()
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
  const msgKey = route.query._id + Math.round(+new Date() / 1000)
  chat.list.push(
    transferData({
      ...params,
      //  01 成功 2等待 3 失败
      isSendType: 1,
      createTime: Math.round(+new Date() / 1000),
      msgKey
    })
  )
  chatScrollTop()
  content_input.value.textContent = ''
  content.value = ''
  sendMessage(params).then((res) => {
    const findIndex = chat.list.findIndex((item) => item.msgKey === msgKey)
    chat.list[findIndex] = transferData(res.data)
    emitter.emit('send_message', res.data)
    // chatScrollTop()
  })
}

const pulldownRefresh = async () => {
  await chatMoveData()
  if (page !== 1) {
    const h = document.body.offsetHeight
    nextTick(() => {
      document.documentElement.scrollTop = document.body.offsetHeight - h
    })
  }
}
function hideKeyboard() {
  document.activeElement.blur()
}
function inputFocus() {
  const isIos = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  // android键盘弹起需要时间
  setTimeout(
    () => {
      chatScrollTop()
      // ios键盘在浏览器上bug
      if (isIos) {
        setTimeout(() => {
          chatScrollTop()
        }, 100)
      }
    },
    isIos ? 0 : 350
  )
}

const messageCallback = (data) => {
  if (!route.query._id || route.query._id !== data.from_uid) {
    return
  }
  chat.list.push(transferData(data))
  nextTick(() => {
    const el = document.documentElement
    const rect = el.getBoundingClientRect()
    // console.log(
    //   Number.parseInt(rect.height),
    //   Number.parseInt(rect.bottom),
    //   Number.parseInt(rect.height) - Number.parseInt(rect.bottom)
    // )
    // 如果处于底部50内，滚动到底部
    if (Number.parseInt(rect.height) - Number.parseInt(rect.bottom) > 50) {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest'
      })
    }
  })
  t()
}
const t = debounce(function () {
  setReadMessage(route.query._id).then(() => {
    handleMessageRead(route.query._id)
  })
}, 1000)
async function handleMessageRead(key, index) {
  const data = await readAllMsgIndexDB('messageStore', 'chatKey', key)
  if (data.length > 0) {
    const temp = data.filter((item) => item.is_read === 0)
    temp.forEach((item) => {
      if (item.is_read === 0) {
        item.is_read = '1'
        updateIndexDB('messageStore', item)
      }
    })
    const obj = await readIndexDB('latestMsgFetched', key)
    if (obj !== 'null') {
      updateIndexDB('latestMsgFetched', {
        ...obj,
        count: 0
      })
    }
  }
}
onBeforeUnmount(() => {
  emitter.off('chat_message', messageCallback)
})
onMounted(() => {
  init()
  // 接收
  emitter.on('chat_message', messageCallback)
  setReadMessage(route.query._id).then(() => {
    handleMessageRead(route.query._id)
  })
})
</script>
<template>
  <div class="chat">
    <van-nav-bar
      fixed
      left-arrow
      :title="taUserInfo.username || ''"
      @click-left="router.back()"
      placeholder
    />
    <van-pull-refresh
      :disabled="chat.listEnding"
      v-model="chat.isLoading"
      :pulling-text="'下拉加载更多'"
      :loosing-text="'松开加载数据'"
      :loading-text="'加载中'"
      @refresh="pulldownRefresh"
    >
      <ul class="chat_list" id="chat_list" @touchstart="hideKeyboard()">
        <template v-for="(item, index) in chat.list">
          <li
            v-if="!item.type"
            class="chat_list_item"
            :class="{
              on: item.from_uid === userInfo._id
            }"
            :style="{
              order: item.timestamp
            }"
          >
            <user-avatar
              :key="
                item.from_uid === userInfo._id
                  ? userInfo.username
                  : taUserInfo.username
              "
              :width="'0.38rem'"
              :height="'0.38rem'"
              :name="
                item.from_uid === userInfo._id
                  ? userInfo.username
                  : taUserInfo.username
              "
              round
            />
            <div class="chat_list_content">
              <template v-if="item.from_uid === userInfo._id">
                <van-loading
                  v-if="item.isSendType === 1"
                  class="loading"
                  size="0.18rem"
                  color="#1989fa"
                />
              </template>
              <div class="content" v-html="item.contentHTML"></div>
            </div>
          </li>
          <li
            v-else="item.type === 2"
            class="chat_list_item on_time"
            :style="{
              order: `${item.timestamp}`
            }"
          >
            <div class="chat_list_item_addtime">
              {{ item.addtime }}
            </div>
          </li>
        </template>
      </ul>
    </van-pull-refresh>
    <footer class="footer">
      <!-- <div class="emoji">
        <van-icon name="smile-o" size="30" />
      </div> -->
      <div class="content">
        <div
          ref="content_input"
          class="input"
          contenteditable
          style="-webkit-user-select: auto"
          placeholder="请输入文字"
          @input="contentInput"
          @focus="inputFocus()"
          autocapitalize="off"
          safe-area-inset-bottom
        ></div>
      </div>
      <div class="footer_button">
        <van-button
          :disabled="content.length <= 0"
          class="button"
          size="large"
          type="primary"
          @click="sendContent"
          >发送</van-button
        >
      </div>
    </footer>
  </div>
</template>
<style lang="less" scoped>
.chat {
  position: relative;
  background-color: #ededed;
}
.footer {
  flex-flow: column;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  background-color: var(--van-white);
  position: fixed;
  position: -webkit-sticky;
  position: sticky;
  bottom: 0;
  .emoji {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .content {
    flex: 1;
    padding: 8px;
    align-self: flex-end;
    .input {
      padding: 7px 8px;
      background-color: #fff;
      min-height: 20px;
      max-height: 70px;
      font-size: 16px;
      line-height: 1.5;
      border-radius: 4px;
      overflow-x: hidden;
      overflow-y: auto;
      outline: none;
      border: 1px solid #ecebeb;
      background-color: #ededed;
      margin: 0 auto;
      word-wrap: break-word;
      word-break: break-all;
    }
    .content_input {
      font-size: 16px;
      border: none;
      resize: none;
      width: 100%;
      background-color: #ededed;
      padding: 6px;
      display: inline-block;
      border-radius: 4px;
    }
  }
  .footer_button {
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 66px;
    // opacity: 0;
    // -webkit-transform: scaleX(0);
    // transform: scaleX(0);
    // transition: all 0.1s;
    .button {
      margin-right: 10px;
      overflow: hidden;
      font-size: 14px;
      height: 32px;
    }
    &.on {
      width: 66px;
      opacity: 1;
      -webkit-transform: scaleX(1);
      transform: scaleX(1);
    }
  }
}
.chat_list {
  margin: 0 12px;
  padding-bottom: 12px;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - (46px + 56px));
  .chat_list_item {
    margin-top: 12px;
    display: flex;
    &.on_time {
      justify-content: center;
      .chat_list_item_addtime {
        color: #a3a3a3;
        font-size: 12px;
      }
    }
    &.on {
      justify-content: flex-start;
      flex-direction: row-reverse;
      .chat_list_content {
        margin-left: 0;
        margin-right: 12px;
        background-color: var(--van-blue);
        color: var(--van-white);
        position: relative;
      }
      .loading {
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        left: -0.26rem;
        font-size: 0.16rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .chat_list_content {
      max-width: 70%;
      word-wrap: break-word;
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
