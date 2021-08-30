import React, { useContext } from 'react'
import myDataContext, {IData} from './hook/useBus'

export default function Sub() {
  const context = useContext(myDataContext)
  const handleClick = () => {
    context.setData((data: IData) => ({
      idx: data.idx + 1
    }))
  }
  return (
    <div>
      <h1>---------------------------------</h1>
      sub----{
        context.idx
      }
      <button onClick={handleClick}>btn</button>
    </div>
  )
}
