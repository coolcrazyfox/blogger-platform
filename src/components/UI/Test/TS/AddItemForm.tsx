import React, { ChangeEvent, KeyboardEvent } from 'react'

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
    const onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        error && setError(null);
        if (e.key === 'Enter') {
            addItem();
        }
    }
    return (
        <div>
            <input
            value={title}
            onChange={onChangeHandler}
            onKeyDown={onKeyPressHandler}
            placeholder={'Title'}
            // helperText={error}
            //  error={!error}

            />
            <button onClick={addItem}> add</button>
        
        </div>
    )
})

export default AddItemForm
