<script setup>
import { createAvatar } from '@dicebear/avatars'
import * as style from '@dicebear/avatars-initials-sprites'
const props = defineProps({
  src: String,
  name: {
    type: String,
    default: ''
  },
  round: {
    type: Boolean,
    default: false
  },
  fit: {
    type: String,
    default: 'cover'
  },
  height: {
    type: String,
    default: '0.45rem'
  },
  width: {
    type: String,
    default: '0.45rem'
  }
})
let svg = createAvatar(style, {
  seed: props.name,
  dataUri: true
  // ... and other options
})
// `https://avatars.dicebear.com/api/initials/:${props.name}.svg`
</script>
<template>
  <van-image
    :width="width"
    :height="height"
    :src="props.src || svg"
    :fit="props.fit"
    :round="props.round"
    :alt="props.name"
  />
</template>
