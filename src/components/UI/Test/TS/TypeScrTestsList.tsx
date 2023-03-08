import React, {ChangeEvent, useCallback} from 'react';
import TestItem from './TestItem'
//@ts-ignore
import s from '../../../../styles/TestList.module.css'
import { FilterValuesType } from '../../../../pages/RegistrationPage'



export type  TaskType={
  id: number
  title: string
  isDone: boolean
}
type PropsType ={  
  id: number
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: number, todolistId: number) => void
  changeFilter: (value: FilterValuesType, todolistId: number) => void
  addTask: (title: string, todolistId: number) => void
  changeTaskStatus: (id: number, isDone: boolean, todolistId: number) => void
  removeTodolist: (id: number) => void
  changeTodolistTitle: (id: number, newTitle: string) => void
  filter: FilterValuesType
  changeTaskTitle: (taskId: number, newTitle: string, todolistId: number) => void
}

const TypeScrTestsList = React.memo((props: PropsType) => {

  const addTask = useCallback((title: string) => {
      props.addTask(title, props.id);
  }, [props.addTask, props.id])

  const removeTodolist = useCallback(() => {
      props.removeTodolist(props.id);
  }, [props.removeTodolist, props.id])
  const changeTodolistTitle = useCallback((title: string) => {
      props.changeTodolistTitle(props.id, title);
  }, [props.changeTodolistTitle, props.id])

  const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.id, props.changeFilter]);
  const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.id, props.changeFilter]);
  const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.id, props.changeFilter]);

  let tasksForTodolist = props.tasks;

  if (props.filter === "active") {
      tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
  }
  if (props.filter === "completed") {
      tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
  }
    
  return (
    <div className={s.test_form}>
      
        <TestItem           
          addTask={addTask}
          changeTodolistTitle={changeTodolistTitle}
          removeTodolist={removeTodolist}
          name={props.title}
          tasksForTodolist={tasksForTodolist}
          onAllClickHandler={onAllClickHandler}
          onActiveClickHandler={onActiveClickHandler}
          onCompletedClickHandler={onCompletedClickHandler}
          filter={props.filter}
          />
          

      
    </div>
  )
})

export default TypeScrTestsList
