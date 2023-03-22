import React, { ChangeEvent, useState } from 'react'
//@ts-ignore
import st from './Blogs.module.css'

enum SelectEnum{
    o = '0',
    createdAt = 'createdAt',
    asc = 'asc',
    desc = 'desc'
}
type BlogSelectFormPropsType={
    onChange:(e: ChangeEvent<HTMLSelectElement>)=>void
}

const BlogSelectForm = ({onChange, ...props}:BlogSelectFormPropsType) => {
    const [selectDate, setSelectDate] = useState<string | undefined>(undefined);
    const [selectName, setSelectName] = useState<string | undefined>(undefined);
    const selectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectValue = e.currentTarget.value       
        if(selectValue === SelectEnum.createdAt || selectValue === SelectEnum.o){
         setSelectDate(selectValue)
         setSelectName(undefined)
        } else if (selectValue === SelectEnum.asc || selectValue ===  SelectEnum.desc) {
        setSelectName(selectValue)
        setSelectDate(undefined)
     }
    }
  return (
    <select onChange={selectHandler} className={st.select} name="text or title" id="1">
       <option  value={SelectEnum.createdAt} >New blogs first</option>
       <option  value={SelectEnum.o}>Old blogs first</option>
       <option  value={SelectEnum.asc}>From A to Z</option>
       <option  value={SelectEnum.desc}>From Z to A</option>                                                   
    </select>
  )
}

export default BlogSelectForm
