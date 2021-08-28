import { ACTION_TYPE, IAction, IState, ITodo } from "./typing"

export const reducer = (state: IState,action:IAction):IState => {
   switch (action.type) {
       case ACTION_TYPE.ADD:
          return {
              ...state,
              todoList: [...state.todoList, action.paylod as ITodo]
          }    
       case ACTION_TYPE.DEL:
          return {
              ...state,
              todoList: state.todoList.filter(todo => todo.id !== action.paylod)
          }    
       default:
           return state;
   } 
}

