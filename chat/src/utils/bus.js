// // eventBus.js
// import emitter from 'tiny-emitter/instance'

// export default {
//   $on: (...args) => emitter.on(...args),
//   $once: (...args) => emitter.once(...args),
//   $off: (...args) => emitter.off(...args),
//   $emit: (...args) => emitter.emit(...args)
// }
import mitt from 'mitt'

const emitter = mitt()

export default emitter
