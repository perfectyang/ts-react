import React, { useCallback, useReducer, useState } from 'react'
import { reducer } from './reducer'
import Input from './todo/Input'
import List from './todo/List'
import { ACTION_TYPE, IAction, IState, ITodo } from './typing'
const initialState:IState = {
    todoList:[]
}

function init(initTodoList: ITodo[]):IState{
    return {
        todoList: initTodoList
    }
}

const App: React.FunctionComponent = (): React.ReactElement => {
  const [ state, dispatch] = useReducer(reducer,[],init)
  const addTodo = useCallback((todo: ITodo) => {
      dispatch({
        type: ACTION_TYPE.ADD,
        paylod: todo
      })
    }, [])

  const deleteTodo = useCallback((id) => {
      dispatch({
        type: ACTION_TYPE.DEL,
        paylod: id
      })
    }, [])

  return (
    <>
      <Input addTodo={addTodo} value="please enter your content" />
      <List dataList={state.todoList as ITodo[]} deleteTodo={deleteTodo} /> 
    </>
  )
}

export default App
