import React from 'react'
import { Input } from '../Input/Input'
//@ts-ignores
import st from './Blog.module.css'

type SearchBlogsPropsType = {
    searchHandler:()=>void
    search: string
}

const SearchBlogs = ({search, searchHandler }:SearchBlogsPropsType) => {
  return (
    <>
        <Input value={search} onChange={searchHandler} className={st.search} placeholder='search' type="text" />      
    </>
  )
}

export default SearchBlogs
