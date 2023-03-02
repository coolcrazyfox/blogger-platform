import React from 'react'
type  TasksType={
    id: number
    title: string 
    isDone: boolean
}
type PropsType ={    
    name: string
    tasks:Array<TasksType>
}
const TestItem = (props:PropsType) => {
  return (
    <div>
        <h2>{props.name}</h2>
        <div>
            <input type="text" />
            <button>+</button>
        </div>
      
    </div>
  )
}

export default TestItem
