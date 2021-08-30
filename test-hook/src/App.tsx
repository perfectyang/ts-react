import React, { useCallback, useMemo, useState } from 'react'
import './App.css'
import Child from './Child';
import myDataContext from './hook/useBus';
import Sub from './Sub';

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState({
    idx: 1
  })
  const [n, setN] = useState(0)
  // const Son = useCallback((() => <h2>title---{count}</h2>),[count])
  const Son = () => <h2>title---{count}</h2>
  const Son2 = useMemo(() => (<h2>我是插son2{count}</h2>), [count])
  const handleBtn = () => {
    setN((n) => n + 1)
    setData((data) => ({
      idx: data.idx + 1
    }))
  }
  return (
    <div className="App">
      <header className="App-header">
        idx: {data.idx}
        <Child name="title" id={1} son={Son} son2={Son2}/>
        <myDataContext.Provider value={{...data, setData}}>
          <Sub />
        </myDataContext.Provider>
        <p>
          <button type="button" onClick={handleBtn}>
            count is: {n}
          </button>
        </p>
      </header>
    </div>
  )
}

export default App
