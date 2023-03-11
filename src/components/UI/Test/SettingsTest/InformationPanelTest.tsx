import React from 'react'
import SuperButton from '../../SuperButton/SuperButton'

type InfoType={
    label: string
    onClicked:()=>void
}
const InformationPanelTest = ({...props}:InfoType) => {
  return (
    <div >
        <button onClick={props.onClicked} >{props.label} </button>
      
    </div>
  )
}

export default InformationPanelTest
