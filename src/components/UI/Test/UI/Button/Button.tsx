import React from 'react'

const Button = ({...props}, children: string) => {
  return (
    <>
      <button {...props}>{children}</button>
      
    </>
  )
}

export default Button
