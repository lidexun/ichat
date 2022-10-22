// 防抖(debounce)
/**
 * @param {function} fn
 * @param {number} delay
 * @returns
 */
export function debounce(func, delay) {
  let timer
  return function () {
    let context = this
    clearTimeout(timer)
    timer = setTimeout(function () {
      func.apply(context, arguments)
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
  let timer
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
