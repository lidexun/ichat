<template>
  <van-row class="emoji_box" align="center">
    <van-col
      class="emoji_item"
      span="3"
      @click="change(item)"
      v-for="item in arr"
      >{{ item }}</van-col
    >
  </van-row>
</template>
<script setup>
// import emitter from '@/utils/bus';
const emit = defineEmits(['change'])
const arr = [
  '😀',
  '😃',
  '😄',
  '😁',
  '😆',
  '😅',
  '😂',
  '🙂',
  '🙃',
  '😉',
  '😊',
  '😇',
  '😍',
  '😘',
  '😗',
  '😚',
  '😙',
  '😋',
  '😛',
  '😜',
  '😝',
  '🤑',
  '🤗',
  '🤔',
  '🤐',
  '😐',
  '😑',
  '😶',
  '😏',
  '😒',
  '🙄',
  '😬',
  '😌',
  '😔',
  '😴',
  '😷',
  '🤒',
  '🤕',
  '😵',
  '😎',
  '🤓',
  '😕',
  '😟',
  '🙁',
  '😮',
  '😯',
  '😲',
  '😳',
  '😧',
  '😨',
  '😰',
  '😥',
  '😭',
  '😱',
  '😖',
  '😣',
  '😞',
  '😩',
  '😤',
  '😡',
  '😠'
]
function change(data) {
  emit('change', {
    data
  })
}
</script>
<style lang="less" scoped>
.emoji_box {
  height: 150px;
  overflow-y: scroll;
  .emoji_item {
    font-size: 22px;
    text-align: center;
  }
}
</style>
