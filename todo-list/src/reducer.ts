import { IAction, IState, ITodo } from "./typing"

export const reducer = (state: IState, action: IAction):IState => {
   switch (action.type) {
       case 'add':
          const value = [...state.todoList, action.paylod as ITodo]
          console.log('value', value)
          return {
              ...state,
              todoList: value
          }    
       case 'del':
          return {
              ...state,
              todoList: state.todoList.filter(todo => todo.id !== action.paylod)
          }    
       default:
           console.log('inii')
           return state
   } 
}

