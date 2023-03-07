import React, {useState} from 'react';
//@ts-ignore
import s from '../styles/RegistrationPage.module.css'
import {initialState} from "../components/NavBar";
import {Link} from "react-router-dom";
import TypeScrTestsList from '../components/UI/Test/TS/TypeScrTestsList';

export type FilterValuesType= 'all'|'active'|'completed'
export type TodolistType={
    id: number
    title: string
    filter: FilterValuesType
  }
export type TasksStateType = {
    [key: number]: Array<TaskType>
} 
const RegistrationPage = () => {

  let todolistId1 = Date.now();
  let todolistId2 = Date.now();

  let [todolists, setTodolists] = React.useState<Array<TodolistType>>(
    [
      {id: todolistId1, title: 'What to learn', filter: 'all'},
      {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]
  )
  
  let [tasks, setTasks]=React.useState<TasksStateType>({
    [todolistId1]: [
      {id: 1, title: "HTML&CSS", isDone: true},
      {id: 2, title: "JavaScript", isDone: true}
    ],
    [todolistId2]: [
      {id: 3, title: "HTML&CSS", isDone: true},
      {id: 4, title: "JavaScript", isDone: true}
    ],

  })
  function removeTask(id: number, todolistId: number) {
    //достанем нужный массив по todolistId:
    let todolistTasks = tasks[todolistId];
    // перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
    tasks[todolistId] = todolistTasks.filter(t => t.id != id);
    // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
    setTasks({...tasks});
}

function addTask(title: string, todolistId: number) {
    let task = {id: Date.now(), title: title, isDone: false};
    //достанем нужный массив по todolistId:
    let todolistTasks = tasks[todolistId];
    // перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
    tasks[todolistId] = [task, ...todolistTasks];
    // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
    setTasks({...tasks});
}

function changeStatus(id: number, isDone: boolean, todolistId: number) {
    //достанем нужный массив по todolistId:
    let todolistTasks = tasks[todolistId];
    // найдём нужную таску:
    let task = todolistTasks.find(t => t.id === id);
    //изменим таску, если она нашлась
    if (task) {
        task.isDone = isDone;
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});
    }
}

function changeTaskTitle(id: number, newTitle: string, todolistId: number) {
    //достанем нужный массив по todolistId:
    let todolistTasks = tasks[todolistId];
    // найдём нужную таску:
    let task = todolistTasks.find(t => t.id === id);
    //изменим таску, если она нашлась
    if (task) {
        task.title = newTitle;
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});
    }
}

function changeFilter(value: FilterValuesType, todolistId: number) {
    let todolist = todolists.find(tl => tl.id === todolistId);
    if (todolist) {
        todolist.filter = value;
        setTodolists([...todolists])
    }
}

function removeTodolist(id: number) {
    // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
    setTodolists(todolists.filter(tl => tl.id != id));
    // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
    delete tasks[id]; // удаляем св-во из объекта... значением которого являлся массив тасок
    // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
    setTasks({...tasks});
}

function changeTodolistTitle(id: number, title: string) {
    // найдём нужный todolist
    const todolist = todolists.find(tl => tl.id === id);
    if (todolist) {
        // если нашёлся - изменим ему заголовок
        todolist.title = title;
        setTodolists([...todolists]);
    }
}

function addTodolist(title: string) {
    let newTodolistId = Date.now();
    let newTodolist: TodolistType = {id: newTodolistId, title: title, filter: 'all'};
    setTodolists([newTodolist, ...todolists]);
    setTasks({
        ...tasks,
        [newTodolistId]: []
    })
}   



  const state = initialState
  const [isActive, setIsActive] = useState<boolean>(false)
  const [liActive, setLiActive] = useState<boolean>(false)
  const [activeId, setActiveId] = useState(state[0].id)
  const handelClick = () => {
        // setActive(current => !current)
        setIsActive(!isActive)
    }
  return (
        <div className={s.main_container}>

            {/*<div className={isActive? s.navigation_box: ''}>*/}
            <div className={isActive ? s.navigationn_active : s.navigationn}>
                <div className={s.menu_toggle} onClick={() => setIsActive(!isActive)}></div>
                <ul>
                    {state.map((t) => {
                            return (
                                <li key={t.id} className={ activeId===t.id? s.lists_active : s.lists} style={{color:`${t.color}`}} onClick={()=>setActiveId(t.id)}>
                                    <Link to={'/registration'} className={s.a} >
                                        <span className={s.icons} style= {activeId===t.id ? {background:`${t.color}`}: {background:'none'}}>{t.icon}</span>
                                        <span className={s.title}>{t.title}</span>
                                    </Link>

                                </li>
                            )
                        }
                    )}
                </ul>
            </div>
            <div className={s.test_container}>
                {todolists.map(tl=>{
                  let allTodolistTasks = tasks[tl.id];
                  let tasksForTodolist= allTodolistTasks

                  if(tl.filter === 'active' ){
                    tasksForTodolist = allTodolistTasks.filter(task=>task.isDone ===false)
                  }
                  if(tl.filter === 'completed' ){
                    tasksForTodolist = allTodolistTasks.filter(task=>task.isDone ===true)
                  }
                  
                  return <TypeScrTestsList
                                key={tl.id}

                                id={tl.id}
                                title={tl.title}
                                tasks={tasksForTodolist}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                filter={tl.filter}
                                removeTodolist={removeTodolist}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                           />
                })}
                
            </div>

            {/*</div>*/}
        </div>

    );
};

export default RegistrationPage;
