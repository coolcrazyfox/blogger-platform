import React from 'react'
import TestItem from './TestItem'

const TypeScrTestsList = () => {
  let tasksTest=[
    {id:1,  title: 'JS', isDone: false},
    {id:2,  title: 'Java', isDone: false},
    {id:3,  title: 'NextJS', isDone: false},
    {id:4,  title: 'Node.JS', isDone: false}
  ]
  let [tasks, setTasks]=React.useState(tasksTest)
  
  
  const onClickDeleteHandler=(id:number)=>{
    let filteredTasks = tasks.filter(t=> t.id!==id)
    setTasks(filteredTasks)
  }
    
  return (
    <>
      
        <TestItem 
          remove={onClickDeleteHandler}
          tasks={tasksTest}
          name={'tests'}/>
      
    </>
  )
}

export default TypeScrTestsList
