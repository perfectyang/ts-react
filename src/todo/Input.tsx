import React, { FC, ReactElement, useRef } from 'react'
import { IInputs } from '../typing'

const Input:FC<IInputs> = ({value, addTodo}):ReactElement => {
    const ref = useRef<HTMLInputElement>(null)
    console.log(addTodo)
    
    const handleEnter = () => {
        const value = ref.current!.value
        if (!value) return
        addTodo({
            id: (new Date()).toLocaleTimeString(),
            content: value,
            complete: false
        })
        ref.current!.value = ''
    }
    return (
        <div className="enter">
           <input placeholder={value} ref={ref} /> 
           <button onClick={handleEnter}>enter</button>
        </div>
    )
}
export default Input
