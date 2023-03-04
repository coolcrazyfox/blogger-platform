import React, { ChangeEvent, KeyboardEvent } from 'react'
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
    const onKeyPressHandler =(e:KeyboardEvent<HTMLInputElement>)=>{
        if(e.key === 'Enter'){
            addTask()
        }
            
    }
    const onClickBtnAllHandler=()=>{
        props.changes('all')
    }
    const onClickBtnActiveHandler=()=>{
        props.changes('active')
    }
    const onClickBtnCompletedHandler=()=>{
        props.changes('completed')
    }
    
  return (
    <div>
        <h2>{props.name}</h2>
        <div>
            <input 
                type="text"
                value={text}
                onChange={onChangeHandler}
                onKeyDown={onKeyPressHandler}
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
            <button onClick={onClickBtnAllHandler}>all</button>
            <button onClick={onClickBtnActiveHandler}>active</button>
            <button onClick={onClickBtnCompletedHandler}>completed</button>
        </div>
      
    </div>
  )
}

export default TestItem
