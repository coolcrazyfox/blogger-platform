import React from 'react'

type FormButtonsType={
    onAllClickHandler:()=>void
    onActiveClickHandler:()=>void
    onCompletedClickHandler:()=>void
}
const FormButtons =React.memo( (props:FormButtonsType) => {
  return (
    <div>
      <button onClick={props.onAllClickHandler}>All</button>
      <button onClick={props.onActiveClickHandler}>Active</button>
      <button onClick={props.onCompletedClickHandler}>Completed</button>
    </div>
  )
})

export default FormButtons
