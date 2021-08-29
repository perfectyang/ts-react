import React, {Dispatch, SetStateAction, useState} from "react";

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

export interface IState {
  todoList: ITodo[]
}

export interface IAction {
  type: string;
  paylod: ITodo | string
}
type Fn<T> = (value: T) => void

export const PlayMusicDispatchContext = React.createContext<Fn<IAction>>(() => {})

interface IContext {
  n: number;
  setN: Dispatch<SetStateAction<number>>
}

export const Ctext = React.createContext<IContext>({} as IContext)
