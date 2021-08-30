import React from "react"

export interface IData {
  [index: string]: any
}
const myDataContext = React.createContext<IData>({})

export default myDataContext