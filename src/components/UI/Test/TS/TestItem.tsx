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
    const onClickDeleteHandler=()=>{

    }
  return (
    <div>
        <h2>{props.name}</h2>
        <div>
            <input type="text" />
            <button>+</button>
        </div>
        <div>
            {props.tasks.map((task)=>(
                <li key={task.id} >
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick={onClickDeleteHandler}>x</button>
                </li>
            ))}
        </div>
        <div>
            <button>all</button>
            <button>active</button>
            <button>completed</button>
        </div>
      
    </div>
  )
}

export default TestItem
