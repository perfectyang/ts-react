import React, {FC, ReactElement } from 'react'
import { ITodo } from '../typing'
interface IProps {
    todo: ITodo,
    deleteTodo: (id: number | string) => void
}
const ListItem:FC<IProps> = ({todo, deleteTodo}) => {
    console.log('----', deleteTodo)
    return (
        <div style={{padding: '10px', texttextDecoration: todo.complete ? 'line-through' : ''}}>
         {todo.id}---{todo.content} --- <button onClick={() => deleteTodo(todo.id)}>x</button>
        </div>
    )
}
export default ListItem
