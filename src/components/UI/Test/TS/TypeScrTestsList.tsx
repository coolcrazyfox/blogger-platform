import React from 'react'
import TestItem from './TestItem'

export type FilterValue= 'all'|'active'|'completed'

const TypeScrTestsList = () => {
  let tasksTest=[
    {id:1,  title: 'JS', isDone: false},
    {id:2,  title: 'Java', isDone: false},
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
    
  return (
    <>
      
        <TestItem 
          changes={changesFilter}
          remove={onClickDeleteHandler}
          tasks={tasksForTodoList}
          name={'tests'}/>
      
    </>
  )
}

export default TypeScrTestsList
