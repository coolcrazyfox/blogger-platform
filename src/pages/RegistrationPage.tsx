import React, {useState} from 'react';
//@ts-ignore
import s from '../styles/RegistrationPage.module.css'
import {initialState} from "../components/NavBar";
import {Link} from "react-router-dom";
import TypeScrTestsList from '../components/UI/Test/TS/TypeScrTestsList';

const RegistrationPage = () => {
    const tasks = initialState
    const [isActive, setIsActive] = useState<boolean>(false)
    const [liActive, setLiActive] = useState<boolean>(false)
    const [activeId, setActiveId] = useState(tasks[0].id)
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
                    {tasks.map((t) => {
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
                <TypeScrTestsList/>
            </div>

            {/*</div>*/}
        </div>

    );
};

export default RegistrationPage;