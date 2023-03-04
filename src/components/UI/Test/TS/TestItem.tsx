import React, { ChangeEvent, KeyboardEvent } from 'react'
import {FilterValue} from './TypeScrTestsList'
//@ts-ignore
import s from '../../../../styles/TestItem.module.css'


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
    changeTaskStatus:(id:number, isDone:boolean)=>void
    filter:FilterValue
}
const TestItem = (props:PropsType) => {
    let [error, setError]=React.useState<string | null>(null)
    let [text, setText]= React.useState<string>('')    
    const addTask=()=>{
        if(text.trim() !== ''){
            props.addTask(text.trim())
            setText('')
        }else{
            setError('Title is required')
        }
        
    }
    const onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        setText(e.currentTarget.value)
    }
    const onKeyPressHandler =(e:KeyboardEvent<HTMLInputElement>)=>{
        setError(null)
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
    <div className={s.items_box}>
        <h2>{props.name}</h2>
        <div>
            <input 
                type="text"
                value={text}
                onChange={onChangeHandler}
                onKeyDown={onKeyPressHandler}
                className={error? s.error: ''}
                />
            <button onClick={addTask}>+</button>
            {error && <div className={s.error_message}>{error}</div>}
        </div>
        <ul className={s.ul}>
            {props.tasks.map((task)=>{
                const onClickHandler=()=> props.remove(task.id)
                const onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{
                    let newIsDoneValue = e.currentTarget.checked
                    props.changeTaskStatus(task.id, newIsDoneValue)
                }
                return( <li key={task.id} >
                        <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                        <span>{task.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>)
            })}
        </ul>
        <div className={s.btn_container}>
            <button onClick={onClickBtnAllHandler} className={props.filter === 'all'? s.btn_active: s.btn}>all</button>
            <button onClick={onClickBtnActiveHandler} className={props.filter === 'active'? s.btn_active: s.btn}>active</button>
            <button onClick={onClickBtnCompletedHandler} className={props.filter === 'completed'? s.btn_active: s.btn}>completed</button>
        </div>
      
    </div>
  )
}

export default TestItem
