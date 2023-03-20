import React, { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useDebounce from '../../../../../hooks/useDebounce';
import { pathSiteBarEnum } from '../../../../../pages/Settings';
import { addBlogTC, getBlogsTC } from '../../../../../redux/BlogsReducer';
import { checkAuthTC } from '../../../../../redux/LoginReducer';
import { selectBlogs, selectBlogsQuery } from '../../../../../redux/selectors/blogs-selectors';
import { selectLogin } from '../../../../../redux/selectors/logib-seletors';
import { useAppDispatch } from '../../../../../store/store';
import Button from '../Button/Button';
import { Input } from '../Input/Input';
import Modal from '../Modal/Modal';
import Blog from './Blog';
//@ts-ignore
import st from './Blogs.module.css'
import BlogsForm from './BlogsForm';

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


    
    const debouncedSearchValue = useDebounce( search, 700)
    const dispatch = useAppDispatch()
  
    useEffect(() => {
        if(localStorage.getItem('token')) {
            dispatch(checkAuthTC({accessToken: localStorage.getItem('token')}))
        }
    }, [])
   

    useEffect(() => {
        dispatch(getBlogsTC({searchNameTerm: debouncedSearchValue, sortBy: selectDate, sortDirection: selectName}))
    }, [debouncedSearchValue, selectDate, selectName])

   

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

    // const {
    //     register, handleSubmit, formState: { errors }, formState, reset } = useForm({
    //         mode: 'onBlur',
    //         defaultValues: {
    //             name: '',
    //             description: '',
    //             websiteUrl: '',
    //         }
    //     });


    const onSubmit = (args: any) => {
        dispatch(addBlogTC({ args }))
        setDisable(true) 
        setActiveForModal()
    }

    const setActiveForModal = () => {
        setModalActive(false)
        // reset()  
    }

   
    const searchHandler = (e: ChangeEvent <HTMLInputElement>) => {
        setSearch(e.currentTarget.value)
        setDisable(false) 
    }

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

    if (isLogin === false ) return <Link to={pathSiteBarEnum.login}/>
  return (
    <div className={st.blogColor}>
            <h3 className={st.title}>Blogs</h3>
            <div className={st.buttonAdd}>
                <Button  onClick={() => { setModalActive(true); } } disabled={false} >Add new Blog</Button>
            </div>
            <hr />
            <Modal active={modalActive} setActive={setActiveForModal} >
                <div className={st.modalBlock}>
                    <Button onClick={setActiveForModal} >X</Button>
                    <BlogsForm onSubmit={onSubmit} dispatch={dispatch}/>
                    {/* <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={st.titleInput}>Name
                            <Input placeholder='name' className={st.inputForm} {...register('name', {
                                required: 'field is required',
                                maxLength: { value: 15, message: 'Max Length 15' },
                            })} />
                        </div>
                        <div>
                            {errors?.name && <p>{errors.name.message || 'Error'}</p>}
                        </div>
                        <div className={st.titleInput}>about
                            <Input placeholder='description' className={st.inputForm} {...register('description', {
                                required: 'field is required',
                                maxLength: { value: 500, message: 'Max Length 500' },
                            })} />
                        </div>
                        <div>
                            {errors.description && <p>{errors.description.message || 'Error'}</p>}
                        </div>
                        <div className={st.titleInput}>website
                            <Input placeholder='www.xxx.com' className={st.inputForm} {...register('websiteUrl', { 
                                required: 'field is required' })} />
                        </div>
                        <div>
                            {errors.websiteUrl && <p>{errors.websiteUrl.message || 'Error'}</p>}
                        </div>
                            <Input  className={st.createBlogButton}  type="submit" value='Create blog' />
                    </form>  */}
                </div>                   
            </Modal>

            <div className={st.inputBlock}>
                <div className={st.child1}>                    
                    <Input value={search} onChange={searchHandler} className={st.search} placeholder='search' type="text" />
                </div>
                <div className={st.child2}>
                    <select onChange={selectHandler} className={st.select} name="text or title" id="1">
                        <option  value={SelectEnum.createdAt} >New blogs first</option>
                        <option  value={SelectEnum.o}>Old blogs first</option>
                        <option  value={SelectEnum.asc}>From A to Z</option>
                        <option  value={SelectEnum.desc}>From Z to A</option>
                    </select>
                </div>
                <div className={st.child3}>
                    <div className={st.blogs}>
                        {
                            blog.map(b => {
                                return (
                                    <div key={b.id}>
                                        <Blog blog={b} />
                                        <hr />
                                    </div>
                                )
                            })
                        }

                    </div>
                    <div className={st.buttonShowMore}>
                        <Button onClick={showMoreHandler} disabled={disabled}>Show more ↓</Button>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Blogs
