<script setup>
import storage from '../../../utils/storage.js'
import { createAvatar } from '@dicebear/avatars'
import * as style from '@dicebear/avatars-initials-sprites'
const userInfo = storage.getItem('userInfo')
let svg = createAvatar(style, {
  seed: userInfo.name,
  dataUri: false
  // ... and other options
})
function share() {
  const shareOpts = {
    title: 'iChat',
    text: 'iChat 一款聊天应用',
    url: window.location.origin
  }
  navigator.share(shareOpts)
}
</script>
<template>
  <div class="user">
    <div class="user_info">
      <user-avatar
        :width="'100%'"
        :height="'100px'"
        :name="userInfo.username"
      ></user-avatar>
      <div class="user_info_box">
        <user-avatar
          class="van-hairline--surround"
          :name="userInfo.username"
        ></user-avatar>
        <div class="username">
          {{ userInfo.username }}
        </div>
      </div>
    </div>
    <van-cell-group>
      <van-cell title="个人信息" is-link />
      <van-cell title="分享应用" is-link @click="share" />
    </van-cell-group>
    <div class="out">
      <van-button size="small" type="danger" block class="out_button"
        >退出</van-button
      >
    </div>
  </div>
</template>
<style lang="less" scoped>
.user {
  min-height: 100vh;
  background-color: var(--van-gray-3);
}
.out {
  padding: 0 16px;
  margin-top: 12px;
  .out_button {
    font-size: 16px;
  }
}
.user_info {
  position: relative;
  &::before {
    content: '';
    z-index: 1;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: saturate(90%) blur(10px);
  }
  .user_info_box {
    position: absolute;
    z-index: 2;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .username {
      color: #fff;
      text-shadow: 2px 2px 2px black;
    }
  }
  // padding: 0;
}
.user_group {
  margin: 12px 0;
  li {
    position: relative;
    display: flex;
    padding: 0 12px 0;
    padding-left: 20px;
    font-size: 16px;
    line-height: 40px;
    background-color: var(--van-white);
    &:active {
      background-image: linear-gradient(
        rgba(0, 0, 0, 0.05),
        rgba(0, 0, 0, 0.05)
      );
    }
  }
}
</style>
