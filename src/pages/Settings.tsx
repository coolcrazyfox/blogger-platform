import React, {useEffect, useState} from 'react';
import NavBar from '../components/NavBar';




const Settings = React.memo(() => {
    let[isActive, setIsActive] = useState<boolean>(false)
    let theme='dark'
   
    return (
        <div> 
           <NavBar 
           theme={theme}
           isActive={isActive}
           setIsActive={setIsActive}
           /> 
              


        </div>
    );
});

export default Settings;
