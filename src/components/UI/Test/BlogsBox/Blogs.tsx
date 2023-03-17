import React, { ChangeEvent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { pathSiteBarEnum } from '../../../../pages/Settings';
import { addBlogTC, getBlogsTC } from '../../../../redux/BlogsReducer';
import { checkAuthTC } from '../../../../redux/LoginReducer';
import { selectBlogs, selectBlogsQuery } from '../../../../redux/selectors/blogs-selectors';
import { selectLogin } from '../../../../redux/selectors/logib-seletors';
import { useAppDispatch } from '../../../../store/store';

enum SelectEnum{
    o = '0',
    createdAt = 'createdAt',
    asc = 'asc',
    desc = 'desc'
}


const Blogs = () => {
    const [modalActive, setModalActive] = useState<boolean>(false);
    const [disabled, setDisable] = useState<boolean>(false)
    const [search, setSearch] = useState<string>("");
    const [selectDate, setSelectDate] = useState<string | undefined>(undefined);
    const [selectName, setSelectName] = useState<string | undefined>(undefined);


    const isLogin = useSelector(selectLogin)
    const blog = useSelector(selectBlogs)
    let {page, pageSize, pagesCount, totalCount} = useSelector(selectBlogsQuery)


    
    const debonsedSerchValue = useDebounce( search, 700)
    const dispatch = useAppDispatch()
  
    useEffect(() => {
        if(localStorage.getItem('token')) {
            dispatch(checkAuthTC({accessToken: localStorage.getItem('token')}))
        }
    }, [])
   

    useEffect(() => {
        dispatch(getBlogsTC({searchNameTerm: debonsedSerchValue, sortBy: selectDate, sortDirection: selectName}))
    }, [debonsedSerchValue, selectDate, selectName])

   

    const showMoreHandler = () => {
        if(pageSize < totalCount){
            pageSize+=10
            dispatch(getBlogsTC({pageSize})) 
        } else if (totalCount < pageSize){
            setDisable(true) 
        }else {
            setDisable(true)  
        }
        
    }

    const onSubmit = (args: any) => {
        dispatch(addBlogTC({ args }))
        setDisable(true) 
        setActiveForModal()
    }

    const setActiveForModal = () => {
        setModalActive(false)
        reset()  
    }

   
    const searchHandler = (e: ChangeEvent <HTMLInputElement>) => {
        setSearch(e.currentTarget.value)
        setDisable(false) 
    }

    const seletHandler = (e: ChangeEvent<HTMLSelectElement>) => {
       const selectValue = e.currentTarget.value       
       if(selectValue === SelectEnum.createdAt || selectValue === SelectEnum.o){
        setSelectDate(selectValue)
        setSelectName(undefined)
       } else if (selectValue === SelectEnum.asc || selectValue ===  SelectEnum.desc) {
       setSelectName(selectValue)
       setSelectDate(undefined)
    }
    }

    if (isLogin === false ) return <Link to={pathSiteBarEnum.login}/>
  return (
    <div>
      
    </div>
  )
}

export default Blogs
