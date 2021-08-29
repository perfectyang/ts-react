import React, { useState, useEffect } from "react"

 const useUpdate  = (fn: () => void, dep: number) =>{
    const [count, setCount] = useState(0)
    useEffect(()=>{
      console.log('11----hook')
      setCount(x=> x + 1)
    }, [dep]);//这里的dep就相当于n
    
    useEffect(()=>{
    if(count > 2){
        fn()
      }
    }, [count, fn]); 
}
export default useUpdate

//   useUpdate(()=>{
//     console.log('变了')
//   }, n)