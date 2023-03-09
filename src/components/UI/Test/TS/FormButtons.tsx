import React from 'react'

const FormButtons = () => {
  return (
    <div>
      <button onClick={onAllClickHandler}>All</button>
      <button onClick={onActiveClickHandler}>Active</button>
      <button onClick={onCompletedClickHandler}>Completed</button>
    </div>
  )
}

export default FormButtons
