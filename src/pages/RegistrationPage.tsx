import React, {useState} from 'react';
//@ts-ignore
import s from '../styles/RegistrationPage.module.css'
import {initialState} from "../components/NavBar";
import {Link} from "react-router-dom";
import TypeScrTestsList from '../components/UI/Test/TS/TypeScrTestsList';

export type FilterValue= 'all'|'active'|'completed'
export type TodolistsType={
    id: number
    title: string
    filter: string
  }
export  type  TasksType={
    taskId: number
    title: string
    isDone: boolean
  }  
const RegistrationPage = () => {
    let [todolists, setTodolists] = React.useState<Array<TodolistsType>>(
        [
            {id: Date.now(), title: 'What to learn', filter: 'all'},
            {id: Date.now(), title: 'What to buy', filter: 'all'},
        ]
    )
    let tasksTest=[
        {taskId:1,  title: 'JS', isDone: false},
        {taskId:2,  title: 'Java', isDone: true},
        {taskId:3,  title: 'NextJS', isDone: false},
        {taskId:4,  title: 'Node.JS', isDone: false}
      ]
      let [tasks, setTasks]=React.useState<Array<TasksType>>(tasksTest)
      let [filter, setFilter]=React.useState<FilterValue>('all')
      let tasksForTodoList= tasks
      if(filter==='active'){
        tasksForTodoList=tasks.filter(task => task.isDone===false)
      }
      if(filter==='completed'){
        tasksForTodoList=tasks.filter(task => task.isDone===true)
      } 
      
      const onClickDeleteHandler=(id:number)=>{
        let filteredTasks = tasks.filter(t=> t.taskId!==id)
        setTasks(filteredTasks)
      }
      const changesFilter=(value: FilterValue)=>{
        setFilter(value)
      }
      const addTask=(text:string)=>{
        let taskNew= {taskId:Date.now(),  title: text, isDone: false}
        let newTasks=[...tasks, taskNew]
        setTasks(newTasks)
      }
      const changeTaskStatus=(id:number, isDone:boolean)=>{
        let task = tasks.find(t=> t.taskId === id)
        if(task){
          task.isDone = isDone
          setTasks([...tasks])
        }
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
                {todolists.map(t=>{
                    let tasksForTodolist= tasks
                    if(t.filter === 'active' ){
                        tasksForTodolist = tasks.filter(task=>task.isDone ===false)
                    }
                    if(t.filter === 'completed' ){
                        tasksForTodolist = tasks.filter(task=>task.isDone ===true)
                    }
                    return <TypeScrTestsList key={t.id}
                                            id={t.id}
                                            title={t.title}
                                            tasks={tasksForTodolist}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeTaskStatus}
                                            filter={t.filter}
                            />
                })}
                
            </div>

            {/*</div>*/}
        </div>

    );
};

export default RegistrationPage;
