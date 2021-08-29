import React, { useState, CSSProperties } from "react"
interface IGLOB {
  questionList: any[]
}


export default () => {
    const [questionList, setQuestionList] = useState(['name'])
    return {
        questionList,
        setQuestionList
    }
}