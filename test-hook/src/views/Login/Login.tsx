import React, { FC } from 'react'
export interface ITodo {
  id: number;
  name: string;
  completed: boolean
}

interface IProps {
  id: number;
  addTodo: (todo: ITodo) => any
}

const Login: FC<IProps> = (props):React.ReactElement => {
  return (
    <div>
      {props.id}
      Login
    </div>
  )
}
export default Login