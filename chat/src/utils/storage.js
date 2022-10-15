export default {
  setItem(key, val) {
    let storage = this.getStroage()
    storage[key] = val
    window.localStorage.setItem(
      import.meta.env.VITE_PK_NAME,
      JSON.stringify(storage)
    )
  },
  getItem(key) {
    return this.getStroage()[key]
  },
  getStroage() {
    return JSON.parse(
      window.localStorage.getItem(import.meta.env.VITE_PK_NAME) || '{}'
    )
  },
  clearItem(key) {
    let storage = this.getStroage()
    delete storage[key]
    window.localStorage.setItem(
      import.meta.env.VITE_PK_NAME,
      JSON.stringify(storage)
    )
  },
  clearAll() {
    window.localStorage.clear()
  }
}
