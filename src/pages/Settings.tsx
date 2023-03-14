import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import PreloaderTest from '../components/UI/Preloader/PreloaderTest';
import InformationPanelTest from '../components/UI/Test/SettingsTest/InformationPanelTest';
import { selectStatus } from '../redux/selectors/app-selectors';


export enum pathSiteBarEnum {
    main = '/',
    blogs = '/',
    posts = '/posts',
    users = '/users',
    postsOfBlog = '/postsOfBlog/:blogId',
    postPage = '/postPage/:id',
    oneBlogPage = '/oneBlogPage/:id',
    login = '/login'
}


const Settings = React.memo(() => {
    const appStatus = useSelector(selectStatus)

    let[isActive, setIsActive] = useState<boolean>(false)
    let [theme, setTheme]=useState<string>('light'||'')
    let title='name platform'
   const onClickHandler=()=>{
    setTheme('')
   }
    return (
        <div style={theme==='light'?{background:'black', display:'flex', height:'100vh', color:'white'}:{background:'blue'}}> 
           <Header title={title} theme={theme} setTheme={setTheme}/>
           <div>
                {appStatus === 'loading' && <PreloaderTest/>}
           </div>
           <NavBar 
           theme={theme}
           isActive={isActive}
           setIsActive={setIsActive}
           /> 
           <InformationPanelTest label={title} onClicked={onClickHandler}/>
           



        </div>
    );
});

export default Settings;
