import React, {ChangeEvent, useCallback} from 'react';
import TestItem from './TestItem'
//@ts-ignore
import s from '../../../../styles/TestList.module.css'
import { FilterValuesType } from '../../../../pages/RegistrationPage'
import EditableSpan from './EditableSpan';
import AddItemForm from './AddItemForm';
import TaskRedux from './TaskRedux';



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
      <h2>
        <EditableSpan value={props.title} onChange={changeTodolistTitle}/>
        <button onClick={removeTodolist}>delete</button>
      </h2>
      <AddItemForm addItem={addTask}/>
      <div>
        {
          tasksForTodolist.map((t)=>{
            return <TaskRedux
                              key={t.id}
                              todolistId={props.id}
                              taskId={t.id}
                              />
          })
        }
      </div>
      <div>
        <button onClick={onAllClickHandler}>All</button>
        <button onClick={onActiveClickHandler}>Active</button>
        <button onClick={onCompletedClickHandler}>Completed</button>
      </div>
      

      
        <TestItem           
          addTask={addTask}          
          removeTodolist={removeTodolist}
          title={props.title}
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
