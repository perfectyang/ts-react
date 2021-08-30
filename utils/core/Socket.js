import Vue from 'vue'
import { getQueryString } from 'Lib/utils'
import id from 'Lib/utils/id/index.js'
import EventEmitter from './EventEmitter'
const vm = new Vue()
const hooks = ['open', 'error', 'close', 'message']
const WebSocket = window.WebSocket || window.MozWebSocket
class Socket {
  $io = null
  $emitter = null
  $connected = false
  $actionCache = null
  constructor (path) {
    this.$io = new WebSocket(path)
    this.$emitter = new EventEmitter()
    this.$actionCache = []
    hooks.forEach((name) => {
      this.$io.addEventListener(name, (event) => {
        if (name !== 'message') {
          this.$connected = name === 'open'
          this.$emitter.emit(`socket.${name}`, event)
          if (this.$connected) {
            this.$actionCache.forEach((action) => {
              this.emit(action.name, action.data)
            })
            this.$actionCache = []
          }
        } else {
          // todo: 缺少后端返回错误监听
          const {
            cmd, data, msg, code, ask, msg_id
          } = JSON.parse(event.data) || {}
          if (code === 0) {
            this.$emitter.emit(cmd, { data, msg, code, ask, msg_id })
          } else {
            vm.$notify.error({
              title: '错误',
              message: msg
            })
          }
        }
      }, false)
    })
  }
  on (name, fn) {
    this.$emitter.on(name, fn)
  }
  emit (name, data) {
    if (this.$connected) {
      // const [mod, cmd] = name.split('.')
      // 所有数据加上token_id
      // data.token_id = getQueryString('token_id')
      // data.trace_id = id.getUniqueId()
      const {token_id} = JSON.parse(window.sessionStorage.getItem('user'))
      this.$io.send(JSON.stringify({ cmd: name, ...data, token_id}))
    } else {
      this.$actionCache.push({ name, data })
    }
  }
  once (name, fn) {
    this.$emitter.once(name, fn)
  }
  off (name, fn) {
    this.$emitter.off(name, fn)
  }
  close (closeCallback) {
    this.once('socket.close', closeCallback)
    this.$io.close()
  }
  static isAvailable () {
    return !!WebSocket
  }
}
// decorator
export function canUseSocket (target, name, descriptor) {
  if (!Socket.isAvailable()) {
    descriptor.value = function () {}
  }
  return descriptor
}
export default Socket
