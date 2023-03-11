import React, {useEffect, useState} from 'react';
import NavBar from '../components/NavBar';
import InformationPanelTest from '../components/UI/Test/SettingsTest/InformationPanelTest';




const Settings = React.memo(() => {
    let[isActive, setIsActive] = useState<boolean>(false)
    let theme='dark'
   
    return (
        <div style={{background:'black', display:'flex', height:'100vh', color:'white'}}> 
           <NavBar 
           theme={theme}
           isActive={isActive}
           setIsActive={setIsActive}
           /> 
           <InformationPanelTest/>
           <div>Hi</div>



        </div>
    );
});

export default Settings;
