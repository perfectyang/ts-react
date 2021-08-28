import React, { FC, ReactElement } from 'react'
import { IDataList } from '../typing'
import ListItem from './ListItem'

const List: FC<IDataList> = ({
    dataList,
    deleteTodo
}): ReactElement => {
    console.log(deleteTodo)
    return (
      <>
          {
            dataList.map((todo) => <div key={todo.id}><ListItem todo={todo} deleteTodo={deleteTodo} /></div> )
          }
      </>
    )
}
export default List