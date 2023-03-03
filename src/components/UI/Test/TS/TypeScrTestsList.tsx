import React from 'react'
import TestItem from './TestItem'

const TypeScrTestsList = () => {
    const tasks=[
        {id:1,  title: 'JS', isDone: false},
        {id:2,  title: 'Java', isDone: false},
        {id:3,  title: 'NextJS', isDone: false},
        {id:4,  title: 'Node.JS', isDone: false}
    ]
  return (
    <>
      
        <TestItem tasks={tasks} name={'tests'}/>
      
    </>
  )
}

export default TypeScrTestsList
