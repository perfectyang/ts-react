export const eventEmitter = {
  // 缓存列表
  list: {},
  // 订阅
  on (event, fn) {
    (this.list[event] || (this.list[event] = [])).push(fn)
    return this
  },
  // 监听一次
  once (event, fn) {
    const _this = this
    function on () {
      _this.off(event, on)
      fn.apply(_this, arguments)
    }
    on.fn = fn
    _this.on(event, on)
    return _this
  },
  // 取消订阅
  off (event, fn) {
    const _this = this
    const fns = _this.list[event]
    if (!fns) return false
    if (!fn) {
      fns && (fns.length = 0)
    } else {
      // 若有 fn，遍历缓存列表，看看传入的 fn 与哪个函数相同，如果相同就直接从缓存列表中删掉即可
      let cb
      for (let i = 0, cbLen = fns.length; i < cbLen; i++) {
        cb = fns[i]
        if (cb === fn || cb.fn === fn) {
          fns.splice(i, 1)
          break
        }
      }
    }
    return _this
  },
  // 发布
  emit () {
    const _this = this
    const event = [].shift.call(arguments)
    if (!_this.list[event]) {
      return false
    }
    const fns = [..._this.list[event]]
    const lastParams = arguments[arguments.length - 1]
    let callFn
    if (lastParams instanceof Function) {
      callFn = [].pop.call(arguments)
    }
    if (!fns || fns.length === 0) {
      return false
    }
    fns.forEach((fn) => {
      const res = fn.apply(_this, arguments)
      callFn && callFn(res) // 有返回结果，且有回调函数，则返回结果,解决异步问题，同步操作
    })
    return _this
  }
}
