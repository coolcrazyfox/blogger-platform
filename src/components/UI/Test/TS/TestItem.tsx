import React, { ChangeEvent } from 'react'
import {FilterValue} from './TypeScrTestsList'


type  TasksType={
    id: number
    title: string 
    isDone: boolean
}
type PropsType ={    
    name: string
    tasks:Array<TasksType>
    remove:(taskId:number)=>void
    changes:(value:FilterValue)=>void
    addTask:(text:string)=>void
}
const TestItem = (props:PropsType) => {
    let [text, setText]= React.useState<string>('')
    const addTask=()=>{
        props.addTask(text)
        setText('')
    }
    const onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        setText(e.currentTarget.value)
    }
    
  return (
    <div>
        <h2>{props.name}</h2>
        <div>
            <input 
                type="text"
                value={text}
                onChange={onChangeHandler}
                onKeyDown={(e)=>{
                    if(e.key === 'Enter'){
                        addTask()
                    }
                }}
                />
            <button onClick={addTask}>+</button>
        </div>
        <div>
            {props.tasks.map((task)=>(
                <li key={task.id} >
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick={()=>{props.remove(task.id)}}>x</button>
                </li>
            ))}
        </div>
        <div>
            <button onClick={()=>{props.changes('all')}}>all</button>
            <button onClick={()=>{props.changes('active')}}>active</button>
            <button onClick={()=>{props.changes('completed')}}>completed</button>
        </div>
      
    </div>
  )
}

export default TestItem
