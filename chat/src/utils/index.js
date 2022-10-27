// 防抖(debounce)
/**
 * @param {function} fn
 * @param {number} delay
 * @returns
 */
export function debounce(func, delay = 300) {
  let timer = null
  return function (...args) {
    let context = this
    if (timer) clearTimeout(timer)
    timer = setTimeout(function () {
      func.apply(context, args)
    }, delay)
  }
}
// 节流(throttle)
/**
 * @param {function} fn
 * @param {number} delay
 * @returns
 */
export function throttle(func, delay) {
  let timer = null
  return function () {
    if (timer) return
    let context = this
    timer = setTimeout(() => {
      func.apply(context, arguments)
      timer = null
    }, delay)
  }
}
//
