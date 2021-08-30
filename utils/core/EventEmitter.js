class EventEmitter {
  events = null
  constructor () {
    this.events = Object.create(null)
  }
  on (name, cb) {
    const vm = this;
    (vm.events[name] || (vm.events[name] = [])).push(cb)
    return vm
  }
  once (name, cb) {
    const vm = this
    const on = (...args) => {
      vm.off(name, on)
      cb.apply(vm, args)
    }
    vm.on(name, on)
    return vm
  }
  off (name, cb) {
    const vm = this
    if (!arguments.length) {
      vm.events = Object.create(null)
      return vm
    }
    const cbs = vm.events[name]
    if (!cbs) return vm
    if (!cb) {
      vm.events[name] = null
      return vm
    }
    const index = vm.events[name].findIndex((fn) => cb === fn)
    if (index !== -1) {
      vm.events[name].splice(index, 1)
    }
    return vm
  }
  emit (name, ...args) {
    const vm = this
    const cbs = vm.events[name]
    if (cbs) {
      cbs.forEach((cb) => {
        cb.apply(vm, args)
      })
    }
    return vm
  }
}
export default EventEmitter
