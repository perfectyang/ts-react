import { useEffect, useRef } from 'react'

const useInterval = (callback: () => void, delay?: number | null) => {
  const savedCallback = useRef<() => void>(() => {})

  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(() => {
    if (delay !== null) {
      const interval = setInterval(() => savedCallback.current(), delay || 0)
      return () => clearInterval(interval)
    }

    return undefined
  }, [delay])
}

type TFn = () => void

const useInterval2 = (callback: TFn, delay?: number | 0 | null) => {
  const ref = useRef<TFn>(() => {})
  useEffect(() => {
    ref.current = callback
  })

  useEffect(() => {
    if (delay !== null) {
      const timer = setInterval(() => ref.current(), delay || 0)
      return () => clearInterval(timer)
    }
    return undefined
  }, [delay])

}



export default useInterval
