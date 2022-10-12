<script setup>
import { openUserChat } from '../../../utils/user.js'
import { getMessage } from '../../../api/user.js'

import router from '../../../router'
const messageList = ref([])
getMessage().then((res) => {
  console.log(res)
})
// onUnmounted(() => {
//   socket.close()
// })
</script>
<template>
  <van-nav-bar
    title="chat"
    :right-text="'查找用户'"
    fixed
    @click-right="router.push('search')"
  />
  <div class="message">
    <ul class="message_list">
      <li class="message_item" @click="openUserChat(item._id)">
        <van-image
          class="message_item_t"
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          fit="cover"
          round
        />
        <div class="message_item_box van-hairline--bottom">
          <div class="name">userInfo</div>
          <div class="content">
            contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent
          </div>
          <div class="addtime">addtime</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="less">
.message_list {
  padding-top: 44px;
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
  }
  .message_item_t {
    height: 44px;
    width: 44px;
    flex: none;
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
      width: 100%;
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
</style>
