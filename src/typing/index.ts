export interface ITodo {
  id: string;
  content: string;
  complete: boolean
}

export interface IDataList {
    dataList: ITodo[],
    deleteTodo: (id: string | number) => void
}

export interface IInputs {
    value?: string,
    addTodo: (todo:ITodo) => void
}

export interface IState{
    todoList: ITodo[]
}

export interface IAction {
  type: string;
  paylod: ITodo | string
}

export enum ACTION_TYPE {
  ADD = 'Add',
  DEL = "del"
}