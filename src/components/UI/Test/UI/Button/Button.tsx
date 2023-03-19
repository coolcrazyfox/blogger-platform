import React from 'react'
import { Link } from 'react-router-dom'
//@ts-ignore
import s from '../../../../../styles/SuperButton.module.css'

type ButtonPropsType={
  link?: string
  label?: string
  onClick:()=> void
  disabled?:boolean
  children:React.ReactNode
}

const Button = ({children, link, label, ...props}:ButtonPropsType) => {
  return (
    <div className={s.button_container} {...props}>
            <Link to={link || '/'} className={s.link_button}>
                <span className={s.span}></span>
                <span className={s.span}></span>
                <span className={s.span}></span>
                <span className={s.span}></span>
                <div className={s.button_label_box}>
                    <div className={s.button_icon}>
                        {label}
                    </div>
                    <div>
                        {children}
                    </div>
                </div>

            </Link>

        </div>
  )
}

export default Button
