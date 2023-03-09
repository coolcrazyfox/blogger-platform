import React from 'react'

type AddItemFormType={
    addItem:(title:string)=>void
}

const AddItemForm = React.memo( (props:AddItemFormType) => {
    let[title, setTitle]=React.useState<string>('')
    let[error, setError]=React.useState<string |null>(null)
    const addItem =()=>{
        if(title.trim() !==''){
            props.addItem(title)
            setTitle('')
        }else{
            setError('Title is required ')
        }
    }
    return (
        <>
        
        </>
    )
})

export default AddItemForm
