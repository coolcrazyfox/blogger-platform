import React from 'react'
import TestItem from './TestItem'
//@ts-ignore
import s from '../../../../styles/TestList.module.css'


export type FilterValue= 'all'|'active'|'completed'
type  TodoListType={
    id: number
    title: string
    filter: string
}
type  TasksType={
  id: number
  title: string
  isDone: boolean
}
type PropsType ={    
  name: string
  tasks:Array<TasksType>
  todolist:Array<TodoListType>
  removeTask:(taskId:number)=>void
  changeFilter:(value:FilterValue)=>void
  addTask:(text:string)=>void
  changeTaskStatus:(id:number, isDone:boolean)=>void
  filter:FilterValue
}

const TypeScrTestsList = (props:PropsType) => {
  
  let tasksTest=[
    {id:1,  title: 'JS', isDone: false},
    {id:2,  title: 'Java', isDone: true},
    {id:3,  title: 'NextJS', isDone: false},
    {id:4,  title: 'Node.JS', isDone: false}
  ]
  let [tasks, setTasks]=React.useState(tasksTest)
  let [filter, setFilter]=React.useState<FilterValue>('all')
  let tasksForTodoList= tasks
  if(filter==='active'){
    tasksForTodoList=tasks.filter(task => task.isDone===false)
  }
  if(filter==='completed'){
    tasksForTodoList=tasks.filter(task => task.isDone===true)
  } 
  
  const onClickDeleteHandler=(id:number)=>{
    let filteredTasks = tasks.filter(t=> t.id!==id)
    setTasks(filteredTasks)
  }
  const changesFilter=(value: FilterValue)=>{
    setFilter(value)
  }
  const addTask=(text:string)=>{
    let taskNew= {id:Date.now(),  title: text, isDone: false}
    let newTasks=[...tasks, taskNew]
    setTasks(newTasks)
  }
  const changeTaskStatus=(id:number, isDone:boolean)=>{
    let task = tasks.find(t=> t.id === id)
    if(task){
      task.isDone = isDone
      setTasks([...tasks])
    }
  }
    
  return (
    <div className={s.test_form}>
      
        <TestItem 
          changeTaskStatus={changeTaskStatus}
          addTask={addTask}
          changes={changesFilter}
          remove={onClickDeleteHandler}
          tasks={tasksForTodoList}
          name={'tests'}
          filter={filter}/>

      
    </div>
  )
}

export default TypeScrTestsList
