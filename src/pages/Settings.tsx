import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import InformationPanelTest from '../components/UI/Test/SettingsTest/InformationPanelTest';




const Settings = React.memo(() => {
    let[isActive, setIsActive] = useState<boolean>(false)
    let [theme, setTheme]=useState<string>('light'||'')
    let title='name platform'
   const onClickHandler=()=>{
    setTheme('')
   }
    return (
        <div style={theme==='light'?{background:'black', display:'flex', height:'100vh', color:'white'}:{background:'blue'}}> 
           <Header title={title} theme={theme} setTheme={setTheme}/>
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
