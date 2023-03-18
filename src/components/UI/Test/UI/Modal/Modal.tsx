import React from 'react'
//@ts-ignore
import s  from '../../../../../styles/Modal.module.css'

type ModalPropsType = {
    active : boolean
    setActive: any
    children: React.ReactNode

}

const Modal = ({active, setActive, children}:ModalPropsType) => {
  return (
    <div className={active? `${s.modal}${s.active}`: s.modal} onClick={()=>setActive(false)}>
        <div className={!active? `${s.modal_content}${s.active}`:s.modal_content} onClick={e=>e.stopPropagation()}>
            {active && children}
        </div>

    </div>
  )
}

export default Modal
