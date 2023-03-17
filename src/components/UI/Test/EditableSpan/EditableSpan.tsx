import React, { ChangeEvent, useState } from 'react';
//@ts-ignore
import st from './EditableSpan.module.css'


type EditableSpanPropsType = {
title: string
changeTitle: (title: string) => void
}

export const EditableSpan = ({title, changeTitle ,...props}: EditableSpanPropsType) => {

 const [value, setValue] = useState(title)
 const [mode, setEditMode] = useState <boolean>(false)

 const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)   
}

const onBlurHandler = () => {
    changeTitle(value)
    setEditMode(false)
}

const onDoubleClickHandler = () => {
    setEditMode(true)
}
    return  mode
            ?<input className={st.inputSpan} type="text" value={title} onChange={onChangeHandler} onBlur={onBlurHandler} autoFocus/>
            : <span className={st.text} onDoubleClick={onDoubleClickHandler}>{title}</span>
            
}
