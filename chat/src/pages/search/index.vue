<script setup>
import { useRouter } from 'vue-router'
import { search } from '../../api/user.js'
import { openUserChat } from '../../utils/user.js'

const value = ref('')
const list = ref([])
const router = useRouter()
function onSearch(username) {
  if (!username) {
    return
  }
  search({
    username
  }).then((res) => {
    list.value = res.data.list
  })
}
function onCancel() {
  router.back()
}
</script>
<template>
  <form action="/">
    <van-search
      v-model="value"
      placeholder="请输入用户名"
      show-action
      autofocus
      @search="onSearch"
      @cancel="onCancel"
      @update:model-value="onSearch"
    />
  </form>
  <ul class="search_list">
    <li v-for="(item, index) in list" @click="openUserChat(item._id)">
      <van-image
        class="image"
        :src="
          item.avatar ||
          `https://avatars.dicebear.com/api/initials/:${item.username}.svg`
        "
        fit="cover"
        round
      />
      <div class="username van-hairline--bottom">{{ item.username }}</div>
    </li>
  </ul>
</template>
<style lang="less" scoped>
.search_list {
  li {
    display: flex;
    padding: 0 16px;
    height: 55px;
    align-items: center;
  }
  .image {
    height: 40px;
    width: 40px;
    flex: none;
    margin-right: 12px;
  }
  .username {
    flex: 1;
    height: 100%;
    font-size: 16px;
    display: flex;
    align-items: center;
  }
}
</style>
