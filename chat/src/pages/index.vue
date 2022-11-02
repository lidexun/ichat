<route>
{
  redirect: "message",
}
</route>
<script setup>
import { useMessageStore } from '@/store/index.js'
const active = ref('message')
const store = useMessageStore()
const count = computed(() => store.getCount)
const list = reactive([
  {
    name: 'message',
    icon: 'chat-o',
    text: '聊天',
    badge: count
  },
  {
    name: 'nearby',
    icon: 'guide-o',
    text: '附近',
    badge: null
  },
  {
    name: 'user',
    icon: 'user-o',
    text: '我的',
    badge: null
  }
])
</script>
<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <van-tabbar v-model="active" route fixed safe-area-inset-bottom>
    <van-tabbar-item
      v-for="(item, index) in list"
      :badge="item.badge"
      :to="'/' + item.name"
      :key="item.name + item.icon"
      :name="item.name"
      :icon="item.icon"
      >{{ item.text }}</van-tabbar-item
    >
  </van-tabbar>
</template>
