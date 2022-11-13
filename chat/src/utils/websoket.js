import emitter from '@/utils/bus.js'

class WebSocketClient {
  constructor(url = {}, option = []) {
    this.url = url
    this.option = option
    this.wsc = {}
    this.handle = null
  }
  init() {
    this.wsc = new WebSocket(this.url, this.option)
    this.wsc.addEventListener('open', (e) => this.onopen(e))
    this.wsc.addEventListener('close', (e) => this.onclose(e))
    this.wsc.addEventListener('error', (e) => this.onerror(e))
  }
  onopen(e) {
    clearInterval(this.handle)
    this.wsc.addEventListener('message', (e) => this.onmessage(e))
    this.checkWebosket()
  }
  onmessage(e) {
    const { type, data } = JSON.parse(e.data)
    console.log(type)
    switch (type) {
      case 'message':
        emitter.emit('message', data)
        emitter.emit('chat_message', data)
        break
      case 'heartbeat':
        // this.checkWebosket()
        // this.wsc.send(JSON.stringify({ type: 'heartbeat', data: 'pong' }))
        break
      default:
        break
    }
  }
  onclose(e) {
    if (e && e.code === 1006) {
      setTimeout(() => {
        this.init()
      }, 1000)
    } else {
      clearInterval(this.handle)
      this.wsc.close()
    }
  }
  onerror(e) {
    console.log('close:', e)
    setTimeout(() => {
      this.init()
    }, 1000)
  }
  checkWebosket() {
    this.handle = setInterval(() => {
      this.wsc.send(JSON.stringify({ type: 'heartbeat', data: 'ping' }))
    }, 30 * 1000)
  }
}
export default WebSocketClient
