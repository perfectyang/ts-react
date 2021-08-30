import { useEffect, useRef } from "react"

export default (value: number, callback: (newVal: number, oldVal: number) => void, config: {immediate: boolean}) => {
  const ref = useRef(0)
  const isInit = useRef(false)
  const isWatch = useRef(true)
  useEffect(() => {
    if (isWatch.current) {
      if (!isInit.current) {
        isInit.current = true
        if (config.immediate) {
          callback(value, ref.current)
        }
      } else {
        callback(value, ref.current)
      }
    }
    ref.current = value
  }, [value])
  return () => {
    isWatch.current = false
  }
}