import React, { useCallback, useContext, useReducer, useState } from 'react'
import useUpdate from './hook/useUpdate'
import { reducer } from './reducer'
import Input from './todo/Input'
import List from './todo/List'
import { Ctext, ITodo, PlayMusicDispatchContext } from './typing'
import getQuestion from './typing/getQuestion'
const App: React.FunctionComponent = (): React.ReactElement => {
  const initValue = {
    todoList: []
  }

  // const el: React.ReactElement<HTMLButtonElement> = null
  const {questionList, setQuestionList} = getQuestion()
 
  const [state, dispatch] = useReducer(reducer, initValue)
  console.log('state', state)
  const addTodo = useCallback((todo) => {
      dispatch({
        type: 'add',
        paylod: todo
      })
    }, [])

  const deleteTodo = useCallback((id) => {
      dispatch({
        type: 'del',
        paylod: id
      })
    }, [])
  
  const dispatchFn = useContext(PlayMusicDispatchContext)
  dispatchFn({
    type: "add",
    paylod: {} as ITodo
  })
  const [n, setN] = useState(0)

  useUpdate(() => {
    console.log('我我')
  }, n)
  const handleUse = () => {
    // setN((n) => n+1)
  }



  return (
    <>
       <h1>n:{n}</h1>
      {
        questionList.map(cur => <h1>{cur}</h1>)
      } 
      <Ctext.Provider value={{n, setN}}>
        <List dataList={state.todoList as ITodo[]} deleteTodo={deleteTodo} /> 
      </Ctext.Provider>
      <Input addTodo={addTodo} value="please enter your content" />
      <button onClick={handleUse}>useUpdate</button>
    </>
  )
}

export default App
