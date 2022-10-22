<script setup>
import { useRouter } from 'vue-router'
import { search } from '../../api/user.js'
import { openUserChat } from '../../utils/user.js'
import { debounce } from '@/utils'

const username = ref('')
const list = ref([])
const router = useRouter()
const onSearch = debounce(function () {
  if (!username.value) {
    return
  }
  search({
    username: username.value
  }).then((res) => {
    list.value = res.data.list
  })
}, 300)
</script>
<template>
  <form action="/">
    <van-search
      v-model="username"
      placeholder="请输入用户名"
      show-action
      autofocus
      @search="onSearch"
      @cancel="router.push('/message')"
      @update:model-value="onSearch"
    />
  </form>
  <ul class="search_list">
    <li v-for="(item, index) in list" @click="openUserChat(item._id)">
      <user-avatar round class="image" :name="item.username"></user-avatar>
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
