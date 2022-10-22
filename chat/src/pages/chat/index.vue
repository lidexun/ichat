<script setup>
import { useRoute, useRouter } from 'vue-router'
import { sendMessage, getTaUserInfo } from '../../api/user.js'
import { transferData, dateFormat, timestamp } from '@/utils/message.js'
import emitter from '../../utils/bus.js'
import storage from '../../utils/storage.js'

const router = useRouter()
const route = useRoute()
const userInfo = storage.getItem('userInfo')
const taUserInfo = ref({})
const messageListStorage = storage.getItem(userInfo._id + 'messageList')
const messageList = messageListStorage
  ? new Map(Object.entries(messageListStorage))
  : new Map()
let page = 1
let limit = 15
let isLoading = ref(false)
let content = ref('')
let content_input = ref(null)
let chatList = ref([])
let chatListEnding = ref(false)
let times = new Map()
onMounted(() => {
  if (
    !messageList.get(route.query._id) ||
    messageList.get(route.query._id).list.length < 20
  ) {
    chatListEnding.value = true
  }
  getTaUserInfo(route.query._id).then((res) => {
    taUserInfo.value = res.data
  })
  if (messageList.size !== 0) {
    moveChatData()
    chatScrollTop()
  }
})
function moveChatData() {
  const begin = (page - 1) * limit
  const end = page * limit
  let temp = messageList.get(route.query._id).list
  temp.sort((a, b) => new Date(b.createTime) - new Date(a.createTime))
  let list = temp.slice(begin, end).map((item) => transferData(item))
  if (list.length === 0) {
    isLoading.value = false
    return
  }
  const tempTimes = []
  for (let index = 0; index < list.length; index++) {
    let tempAddTime = dateFormat(list[index].createTime)
    tempAddTime = tempAddTime.split(' ')
    if (index === list.length - 1) {
      tempTimes.pop()
    } else {
      if (!times.get(tempAddTime[0])) {
        times.set(tempAddTime[0], 1)
        tempTimes.push({
          type: 2,
          addtime: tempAddTime[0],
          timestamp: timestamp(`${tempAddTime[0]} 00:00:00`)
        })
      }
    }
  }
  chatList.value = list.concat(chatList.value, tempTimes)
  if (temp.length <= chatList.value.length) {
    if (!chatListEnding.value) {
      const lastData = chatList.value[0]
      let tempAddTime = dateFormat(lastData.createTime)
      tempAddTime = tempAddTime.split(' ')
      chatList.value.push({
        type: 2,
        addtime: tempAddTime[0],
        timestamp: timestamp(`${tempAddTime[0]} 00:00:00`)
      })
      chatListEnding.value = true
    }
  }
  if (page !== 1) {
    const h = document.body.offsetHeight
    nextTick(() => {
      chatScrollTop(document.body.offsetHeight - h)
    })
  }
  isLoading.value = false
  page++
}

function chatScrollTop(top = 999999) {
  nextTick(() => {
    document.documentElement.scrollTop = top
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
  sendMessage(params).then((res) => {
    chatList.value.push(transferData(res.data))
    emitter.emit('send_message', res.data)
    content_input.value.textContent = ''
    content.value = ''
    chatScrollTop()
  })
}
function onRefresh() {
  moveChatData()
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
          nextTick(() => {
            document.documentElement.scrollIntoView(false)
          })
        }, 100)
      }
    },
    isIos ? 0 : 350
  )
}
// 接收
emitter.on('chat_message' + route.query._id, (data) => {
  chatList.value.push(transferData(data))
  nextTick(() => {
    const el = document.documentElement
    const rect = el.getBoundingClientRect()
    // 如果处于底部50内，滚动到底部
    if (rect.height - rect.bottom > 50) {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest'
      })
    }
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
      :disabled="chatListEnding"
      v-model="isLoading"
      :pulling-text="'下拉加载更多'"
      :loosing-text="'松开加载数据'"
      :loading-text="'加载中'"
      @refresh="onRefresh"
    >
      <ul class="chat_list" id="chat_list" @touchstart="hideKeyboard()">
        <template v-for="(item, index) in chatList">
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
              :key="index + ' ' + item.timestamp"
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
        ></div>
      </div>
      <div class="footer_button" :class="{ on: content.length > 0 }">
        <van-button
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
    width: 0px;
    opacity: 0;
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    transition: all 0.1s;
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
