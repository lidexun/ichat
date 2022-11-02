<route>
{
  meta: {
    keepAlive: true
  }
}
</route>
<script setup>
import { useRoute, useRouter } from 'vue-router'
import { getMessage, setReadMessage, getTaUserInfo } from '@/api/user.js'
import { openUserChat } from '@/utils/user.js'
import { transferData } from '@/utils/message.js'
import storage from '@/utils/storage.js'
import { useMessageStore } from '@/store/index.js'
import {
  addIndexDB,
  readIndexDB,
  updateIndexDB,
  readAllIndexDB,
  readAllMsgIndexDB
} from '@/utils/indexDB.js'
import emitter from '@/utils/bus.js'
const router = useRouter()
const userInfo = storage.getItem('userInfo')
const uid = userInfo._id
let messageList = new Map()
const store = useMessageStore()
let state = reactive({
  list: null
})
onMounted(() => {
  setTimeout(() => {
    init()
  }, 100)
  // 发送成功后更新列表
  emitter.on('send_message', (data) => {
    handleNewMessage([data])
  })
  // 接收后更新列表
  emitter.on('message', (data) => {
    handleNewMessage([data]).then(() => {
      if (router.currentRoute.value.name === 'chat') {
        const index = state.list.findIndex(
          (item) => item.userInfo._id === data.from_uid
        )
        state.list[index].count = 0
      }
    })
  })
})
watch(state, (newvalue, oldvalue) => {
  setMessageCount()
})
const init = async () => {
  // 如果本地db有数据库
  const latestMsg = await readAllIndexDB('latestMsgFetched', '')
  if (latestMsg.length !== 0) {
    for (let index = 0; index < latestMsg.length; index++) {
      let item = latestMsg[index]
      messageList.set(item.userInfo._id, item)
    }
    state.list = latestMsg
  } else {
    state.list = []
  }
  let time = 0
  if (messageList.size !== 0) {
    time = latestMsg.reduce((a, b) => {
      return a.addTime > b.addTime ? a : b
    }).addTime
  }
  const res = await getMessage({ time })
  if (res.data.length === 0) {
    return
  }
  handleNewMessage(res.data)
}
async function handleNewMessage(data = [], keyVal) {
  let uids = [...messageList.keys()]
  let usersData = [...messageList.values()].map((item) => item.userInfo)
  let p = []
  data.forEach((item) => {
    const key = item.from_uid === uid ? item.to_uid : item.from_uid
    if (!uids.includes(key) && !p.includes(key)) {
      p.push(key)
    }
  })
  if (p.length > 0) {
    const res = await getTaUserInfo(p.toString())
    usersData = usersData.concat(res.data)
    res.data.forEach((item) => {
      addIndexDB('userStore', item)
    })
  }
  for (let index = 0; index < data.length; index++) {
    const item = data[index]
    const key = item.from_uid === uid ? item.to_uid : item.from_uid
    const temp = messageList.get(key)
    const userInfo = usersData.find((info) => info._id === key)
    let count = temp !== undefined && temp.count ? temp.count : 0
    if (item.from_uid !== uid && Number.parseInt(item.is_read) === 0) {
      count = count + 1
    }
    const chatKey = key
    let obj = {
      _id: item._id,
      count,
      userInfo,
      latestData: transferData(item),
      addTime: item.createTime,
      chatKey
    }
    if (temp) {
      if (obj.addTime > temp.addTime) {
        updateIndexDB('latestMsgFetched', obj)
        messageList.set(key, obj)
        const findIndex = state.list.findIndex(
          (item) => item.userInfo._id === key
        )
        state.list[findIndex] = obj
      }
    } else {
      addIndexDB('latestMsgFetched', obj)
      messageList.set(key, obj)
      state.list.push(obj)
    }
    addIndexDB('messageStore', { ...item, chatKey })
  }
}

function clickMessage({ userInfo }, index) {
  state.list[index].count = 0
  // 修改与用户的已读状态
  openUserChat(userInfo._id)
}
// 设置tab未读数量
function setMessageCount() {
  let count = 0
  state.list.forEach((item, key) => {
    count += item.count
  })
  store.setCount(count)
}
</script>
<template>
  <van-nav-bar title="聊天" :right-text="'查找用户'" fixed>
    <template #right>
      <van-icon
        name="search"
        class="search_icon"
        @click="router.push('search')"
      />
    </template>
  </van-nav-bar>

  <div class="message" v-if="state.list !== null">
    <van-empty description="空空如也" v-if="state.list.length === 0" />
    <ul class="message_list" v-else>
      <li
        class="message_item"
        v-for="(item, index) in state.list"
        :style="{
          order: `-${item.addTime}`
        }"
        @click="clickMessage(item, index)"
      >
        <user-avatar :name="item.userInfo.username" round />
        <div class="message_item_box van-hairline--bottom">
          <div class="name" v-text="item.userInfo.username"></div>
          <div class="content">
            {{ item.latestData.contentCopy }}
          </div>
          <div class="addtime" v-html="item.latestData.addtime"></div>
          <van-badge
            v-show="item.count > 0"
            class="badge"
            :content="item.count"
          >
          </van-badge>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="less">
.message_list {
  padding-top: 44px;
  display: flex;
  flex-direction: column;
  .message_item {
    padding: 0 16px;
    height: 60px;
    display: flex;
    align-items: center;
    &:active {
      background-image: linear-gradient(
        rgba(0, 0, 0, 0.05),
        rgba(0, 0, 0, 0.05)
      );
    }
    .badge {
      position: absolute;
      top: auto;
      right: 16px;
      bottom: 0;
    }
  }
  .message_item_box {
    margin-left: 12px;
    width: calc(100% - (44px + 12px));
    flex-grow: 1;
    position: relative;
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    .name {
      font-size: 14px;
      color: #191919;
      font-weight: bold;
    }
    .content {
      width: 85%;
      font-size: 12px;
      color: #b1b1b1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .addtime {
      position: absolute;
      font-size: 12px;
      color: #b1b1b1;
      top: 10px;
      right: 0;
    }
  }
}
.search_icon {
  font-size: 18px;
}
</style>
