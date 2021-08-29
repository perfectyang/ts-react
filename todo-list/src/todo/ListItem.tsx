import React, {CSSProperties, FC, ReactElement, useContext } from 'react'
import { Ctext, ITodo } from '../typing'
import getQuestion from '../typing/getQuestion'
interface IProps {
    todo: ITodo,
    deleteTodo: (id: number | string) => void
}
const styles: CSSProperties = {
    textAlign: 'center',
    color: 'red'
}
const ListItem:FC<IProps> = ({todo, deleteTodo}) => {
    const {n, setN} = useContext(Ctext)
    const delTodo = () => {
        setN((n) => n+1)
        deleteTodo(todo.id)
        setQuestionList((ql) => {
           return [...ql, todo.content]
        })
    }
    const {questionList, setQuestionList} = getQuestion()
    console.log('--->222', questionList)
    return (
        <>
        <div style={{padding: '10px', textDecoration: todo.complete ? 'line-through' : ''}}>
         {todo.id}---{todo.content} --- <button onClick={delTodo}>x</button>
        </div>
        <h1 style={styles}>{todo.content}</h1>
        </>
    )
}
export default ListItem
