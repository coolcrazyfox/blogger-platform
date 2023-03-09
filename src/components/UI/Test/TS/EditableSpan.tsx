import React, { ChangeEvent } from 'react'

type EditableSpanType ={
    value: string
    onChange: (newValue: string)=>void
}

const EditableSpan =React.memo( (props:EditableSpanType) => {
    let [editMode, setEditMode]=React.useState<boolean>(false)
    let[title, setTitle]=React.useState<string>(props.value)
    const activateEditMode=()=>{
        setEditMode(true)
        setTitle(props.value)
    }
    const activateViewMode=()=>{
        setEditMode(false)
        props.onChange(title)
    }
    const changeTitle=(e:ChangeEvent<HTMLInputElement>)=>{
        setTitle(e.currentTarget.value)
    }
    return (
        <>
        {
            editMode ?
            <input value={title} onChange={changeTitle} />
            :
            <span onDoubleClick={activateEditMode}>{props.value}</span>
        }
        
        </>
    )
})

export default EditableSpan
