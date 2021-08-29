import { useCallback, useState } from 'react'

const useSetState = <T extends Record<string, any>>(
  initialState: T = {} as T,
): [T, (patch: Partial<T> | ((prevState: T) => Partial<T>)) => void] => {
  const [state, set] = useState<T>(initialState)
  const setState = useCallback(
    (patch) => {
      set((prevState) => Object.assign({}, prevState, patch instanceof Function ? patch(prevState) : patch))
    },
    [set],
  )

  return [state, setState]
}

interface Person {
  age: number
}
interface Animal {
  name: string
}
type Teacher = {
   teach:() => void
}
type TF<T = any[]> = (name: string, val: T, ...args: any[]) => string | T

const f:TF<number> = (name, num, ...args) => {
  console.log(args)
  return num
}
f('a', 1, 2)

interface people extends Person, Animal, Teacher {
  run: (use: string) => void
} 

const p: people = {
  age: 11,
  name: 'aa',
  run (n) {
    console.log('run', n)
  },
  teach () {}
}

p.run('a')

export default useSetState
