<script setup></script>

<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive :include="['index']">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
