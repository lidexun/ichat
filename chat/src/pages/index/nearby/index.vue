<script setup>
import close_white_png from '@/assets/close_white.png'
import close_png from '@/assets/close.png'
import like_white_png from '@/assets/like_white.png'
import like_png from '@/assets/like.png'
import { useUserInfoStore } from '@/store/index.js'

const store = useUserInfoStore()
const userInfo = store.getUserInfo
const arr = []
/* 测试数据*/
const tu = [
  'https://img2.baidu.com/it/u=3032519929,1955737534&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=1280',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fmobile%2F2020-08-31%2F5f4cb932f0ef6.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1669834683&t=b4acc1bacc815ab47d41f6078923843a',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg9.51tietu.net%2Fpic%2F2019-091216%2Fiuh0yifksdgiuh0yifksdg.jpg&refer=http%3A%2F%2Fimg9.51tietu.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662573014&t=8362e1dbd63b5df009e81722daa685e4',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fmobile%2F2020-06-19%2F5eec5f30c7a71.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662573014&t=e46c2e2622713d2a5c4d2a325ab1f08d',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fmobile%2F2018-08-13%2F5b710018b4eb7.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662573014&t=9e4d320d3767375fba87e9f63565668d',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fmobile%2F2019-04-22%2F5cbd8defcba7c.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662573024&t=393015cda5a08c0d3fad67cc08e4e5fc'
]
for (let index = 0; index < 20; index++) {
  const n = Math.floor(Math.random() * (tu.length - 1))
  let data = {
    image: tu[n],
    title: '你好,测试数据无反应',
    desc: n + 500 + 'm ' + '30分钟前活跃',
    tags: ['射手座']
    // image: tu[index],
  }
  arr.push(data)
}
let state = reactive({
  show: false,
  list: [],
  winWidth: window.innerWidth,
  winHeigh: window.innerHeight,
  /*记录x y轴*/
  x: {
    start: 0,
    move: 0,
    end: 0
  },
  y: {
    start: 0,
    move: 0,
    end: 0
  },
  visible: 3,
  /*下标*/
  currentIndex: 0,
  /*滑动*/
  swipering: false,
  /*滑动中*/
  slideing: false,
  love: 0,
  dislike: 0,
  btnClickType: false
})
state.list = arr
setTimeout(() => {
  state.show = true
}, 3000)
function cardTransform(item, index) {
  let css = {}
  if (index === state.currentIndex) {
    if (state.slideing) {
      css['transitionDuration'] = `${!state.swipering ? 1000 : 0}ms`
    } else {
      css['transitionDuration'] = `${!state.swipering ? 300 : 0}ms`
    }
  }
  return css
}
function touchStart(e, index) {
  if (state.slideing) return
  if (
    typeof state.list[index].x === 'undefined' &&
    typeof state.list[index].y === 'undefined'
  ) {
    state.list[index]['y'] = 0
    state.list[index]['x'] = 0
  }
  state.swipering = true
  state.x.start = e.touches[0].pageX
  state.y.start = e.touches[0].pageY
}
function touchMove(e, index) {
  if (state.slideing) return
  // 滑动状态/最后一个就不滑动
  if (state.list.length == index + 1) {
    return
  }
  state.x.move = e.touches[0].pageX
  state.y.move = e.touches[0].pageY

  state.list[index].x = state.x.move - state.x.start
  state.list[index].y = state.y.move - state.y.start
  if (Number.parseInt(state.list[index].x) > 0) {
    state.love = Number.parseInt(state.list[index].x) / (100 * 2)
  } else {
    state.dislike = Math.abs(Number.parseInt(state.list[index].x) / (100 * 2))
  }
}
function touchEnd(index) {
  if (state.slideing) return
  state.swipering = false
  if (state.list.length == index + 1) {
    return
  }
  if (
    state.list[index].x > 0 &&
    state.list[index].x > state.winWidth / 2 - state.winWidth / 5
  ) {
    touchEndNext(index)
  } else if (
    state.list[index].x < 0 &&
    state.list[index].x < -state.winWidth / 2 + state.winWidth / 5
  ) {
    touchEndNext(index)
  } else {
    state.list[index].x = 0
    state.list[index].y = 0
    state.slideing = false
    state.love = 0
    state.dislike = 0
  }
}
function touchEndNext(index) {
  state.slideing = true
  state.list[index].x = state.list[index].x * 5
  state.list[index].y = state.list[index].y * 5
  touchEndDone()
}
function touchEndDone() {
  return new Promise((resolve) => {
    setTimeout(() => {
      state.slideing = false
      state.currentIndex++
      // state.$emit('onChange', {
      //   currentIndex: state.currentIndex,
      //   currentItem: state.list[state.currentIndex],
      //   type: state.love !== 0 ? 'love' : 'dislike'
      // })
      state.x.move = 0
      state.y.move = 0
      state.slideing = false
      state.btnClickType = false
      state.love = 0
      state.dislike = 0
      resolve()
    }, 300)
  })
}
function footerBtnClick(type) {
  if (state.btnClickType) {
    return
  }
  state.btnClickType = true
  let w = 0
  if (type === 'love') {
    w = state.winWidth * 1.5
    state.love = 1
  } else if (type === 'dislike') {
    w = -state.winWidth * 1.5
    state.dislike = 1
  }
  state.list[state.currentIndex]['x'] = w
  touchEndDone()
}
</script>
<template>
  <van-nav-bar title="附近" fixed />
  <div
    class="tantan-slide"
    :style="{
      width: state.winWidth + 'px',
      height: state.winHeigh + 'px'
    }"
  >
    <div class="user_fixed" v-if="!state.show">
      <user-avatar
        round
        :width="'1rem'"
        :height="'1rem'"
        :name="userInfo.username"
      ></user-avatar>
    </div>
    <transition name="van-fade">
      <div
        v-show="state.show"
        @touchstart.capture="touchStart($event, state.currentIndex)"
        @touchmove.stop.prevent.capture="touchMove($event, state.currentIndex)"
        @touchend.capture="touchEnd(state.currentIndex)"
        class="tantan-slide-box"
      >
        <div class="tantan-slide-footer">
          <div
            class="tantan-slide-footer-btn"
            @click="footerBtnClick('dislike')"
          >
            <div
              class="tantan-slide-footer-icon"
              :style="{
                backgroundColor: '#f8ba35',
                opacity: state.dislike,
                zIndex: 1
              }"
            >
              <van-image width="25" height="25" :src="close_white_png" />
            </div>
            <div class="tantan-slide-footer-icon">
              <van-image width="25" height="25" :src="close_png" />
            </div>
          </div>
          <div
            class="tantan-slide-footer-btn"
            @click.stop="footerBtnClick('love')"
          >
            <div
              class="tantan-slide-footer-icon"
              :style="{
                backgroundColor: '#fa547c',
                opacity: state.love,
                zIndex: 1
              }"
            >
              <van-image width="25" height="25" :src="like_white_png" />
            </div>
            <div class="tantan-slide-footer-icon">
              <van-image width="25" height="25" :src="like_png" />
            </div>
          </div>
        </div>
        <template v-for="(item, index) in state.list">
          <div
            :key="index"
            class="tantan-slide-box-item"
            v-if="state.currentIndex + state.visible >= index"
            :style="[
              cardTransform(item, index),
              {
                zIndex: state.list.length - index,
                opacity:
                  state.currentIndex + state.visible - 1 >= index &&
                  state.currentIndex <= index
                    ? 1
                    : 0,
                transform:
                  'rotate(' +
                  (item.x || 0) / 30 +
                  'deg) translate3d(' +
                  (item.x || 0) +
                  'px,' +
                  (item.y || 0) +
                  'px, ' +
                  (state.currentIndex - index) * 50 +
                  'px)'
              }
            ]"
          >
            <!-- 加载图片会闪屏 双if避免 -->
            <template
              v-if="
                state.currentIndex + state.visible >= index &&
                state.currentIndex <= index
              "
            >
              <img
                class="tantan-slide-img"
                mode="aspectFill"
                :src="item.image"
              />
              <div class="tantan-slide-box-item-bg">
                <div class="tantan-slide-box-info">
                  <div
                    class="title"
                    v-if="item.title"
                    v-text="item.title"
                  ></div>
                  <div class="desc" v-if="item.desc" v-text="item.desc"></div>
                  <div class="tags" v-if="item.tags && item.tags.length > 0">
                    <text
                      class="tag"
                      v-for="(item1, index1) in item.tags"
                      v-text="item1"
                    ></text>
                  </div>
                </div>
              </div>
              <div v-if="index === state.currentIndex">
                <div
                  class="tantan-slide-box-icon tantan-slide-box-dislike"
                  :style="{
                    opacity: state.dislike * 1.5,
                    transform:
                      'scale(' +
                      (state.dislike + 1 > 2 ? 2 : state.dislike + 1) +
                      ')'
                  }"
                >
                  <van-image width="15" height="15" :src="close_png" />
                </div>
                <div
                  class="tantan-slide-box-icon tantan-slide-box-love"
                  :style="{
                    opacity: state.love * 1.5,
                    transform:
                      'scale(' + (state.love + 1 > 2 ? 2 : state.love + 1) + ')'
                  }"
                >
                  <van-image width="15" height="15" :src="like_png" />
                </div>
              </div>
            </template>
          </div>
        </template>
      </div>
    </transition>
  </div>
</template>
<style>
/* fa547c f8ba35 */
.tantan-slide {
  /* background-color: #2196f3; */
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  margin: auto;
}

.tantan-slide-box {
  position: relative;
  width: 95%;
  height: 80%;
  perspective: 1050px;
  perspective-origin: 50% -30%;
  transform-style: preserve-3d;
  margin: auto;
}

.tantan-slide-box-item {
  transform-style: preserve-3d;
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  position: absolute;
  opacity: 0;
  transform: translate3d(0px, 0px, 0px) rotate(0deg);
  transition: 300ms;
  color: #fff;
  /* display: none; */
}

.tantan-slide-box-item.on {
  /* opacity: 1; */
  display: block;
}

.tantan-slide-box-item-bg {
  height: 190px;
  background-image: linear-gradient(to bottom, transparent, #000000 70%);
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 1;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
}

.tantan-slide-box-icon {
  position: absolute;
  width: 35px;
  height: 35px;
  top: 22.5px;
  border-radius: 100%;
  background-color: #fff;
  z-index: 1;
  opacity: 0;
  transition: 100ms;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tantan-slide-box-love {
  left: 50px;
}

.tantan-slide-box-dislike {
  right: 50px;
}

.tantan-slide-footer {
  /* background-color: rgba(0, 0, 0, 0.3); */
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 9999;
  padding: 15px 0;
  display: flex;
  justify-content: center;
}

.tantan-slide-footer-btn {
  height: 48px;
  width: 90px;
  margin: 0 8px;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-content: center;
  position: relative;
  transition: 100ms;
}

.tantan-slide-footer-btn:active {
  transform: scale(0.9);
}

.tantan-slide-footer-icon {
  width: 100%;
  height: 100%;
  border-radius: 25px;
  transition: 200ms;
  background-color: rgba(158, 158, 158, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
}

.tantan-slide-img {
  overflow: hidden;
  position: relative;
  will-change: transform;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  object-fit: cover;
}
.tantan-slide-img.on {
  transform: scale(1);
  width: 25px;
  height: 25px;
}
.tantan-slide-box-info {
  padding: 0 16px;
  color: #ffffff;
}
.tantan-slide-box-info .title {
  font-size: 32px;
  line-height: 1.2;
  text-shadow: 0 0 5px rgb(0, 0, 0, 0.5);
}
.tantan-slide-box-info .desc {
  font-size: 16px;
  line-height: 1.2;
  margin-top: 15px;
  text-shadow: 0 0 5px rgb(0, 0, 0, 0.5);
}
.tantan-slide-box-info .tags {
  margin-top: 12px;
}
.tantan-slide-box-info .tag {
  height: 24px;
  font-size: 12px;
  padding: 0 8px;
  line-height: 24px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 5px;
}
.user_fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 100px;
  height: 100px;
  z-index: 999;
}
.user_fixed:after,
.user_fixed:before {
  width: 100%;
  height: 100%;
  background: var(--van-blue);
  opacity: 0.1;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  display: table;
  content: '';
  animation-name: yuan;
  animation-duration: 3s;
  animation-iteration-count: 1;
}
.user_fixed:after {
  /* animation-delay: 0.2s; */
}
.user_fixed:before {
  animation-delay: 1s;
}
/* .user_fixed:after {
  -webkit-animation: yuan 1.5s linear 0.5s infinite;
  animation: yuan 1.5s linear 0.5s infinite;
}
.user_fixed:before {
  -webkit-animation: yuan 3s linear 3s infinite;
  animation: yuan 3s linear 3s infinite;
} */
@-webkit-keyframes yuan {
  from {
    opacity: 0.3;
    -webkit-transform: scale(0) translate3d(0, 0, 0);
  }

  to {
    opacity: 0;
    -webkit-transform: scale(5) translate3d(0, 0, 0);
  }
}

@keyframes yuan {
  from {
    opacity: 0.3;
    -webkit-transform: scale(0) translate3d(0, 0, 0);
    transform: scale(0) translate3d(0, 0, 0);
  }

  to {
    opacity: 0;
    -webkit-transform: scale(5) translate3d(0, 0, 0);
    transform: scale(5) translate3d(0, 0, 0);
  }
}
</style>
