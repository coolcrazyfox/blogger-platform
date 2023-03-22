import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { BlogType, removeBlogTC, updateBlogTC } from '../../../../../redux/BlogsReducer'
import { useAppDispatch } from '../../../../../store/store'
import Button from '../Button/Button'
import { Input } from '../Input/Input'
import Modal from '../Modal/Modal'
//@ts-ignores
import st from './Blog.module.css'

type BlogPropsType = {
    blog: BlogType
}

const Blog = ({blog, ...props}: BlogPropsType) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [active, setActive] = useState<boolean>(false)
    const [updateModalActive, setUpdateModalActive] = useState<boolean>(false)
    const [id, setId] = useState('')

    const {
        register, handleSubmit, formState: { errors }, formState, reset } = useForm({
            mode: 'onBlur',
            defaultValues: {
                name: '',
                description: '',
                websiteUrl: '',
            }
        });

    const onSubmit = (args: any) => {
        dispatch(updateBlogTC({id, args}))
        setUpdateModalActive(false)
    }

    const onClickBlogHandler = (blogId: string) => {
        navigate(`/oneBlogPage/${blogId}`)
        // dispatch(getBlogPostsTC({blogId}))
    }

    const removeBlogHandler = () => {
        setActive(true)
    }
    
    const buttonNoHandler = () => {
        setActive(false)
    }

    const buttonYesHandler = (id: string) => {
         dispatch(removeBlogTC({id}))
        setActive(false)
    }

    const updateBlogHandler = (id: string) => {
        setId(id)
        setUpdateModalActive(true)
    }

    const closeUpdateModalHandler = () => {
        setUpdateModalActive(false)
        reset()
    }
  return (
    <div>
        <Modal active={active} setActive={undefined} >
            <div className={st.modalBlock}>
                <div className={st.modalTitle}>Are you really wants to delete Blog?</div>
                <div className={st.buttonBlock}>
                    <Button  onClick={()=> {buttonYesHandler(blog.id)}}>Yes</Button>
                    <Button  onClick={buttonNoHandler}>No</Button>
                </div>
            </div>
        </Modal>
        <Button  onClick={removeBlogHandler}>Remove blog</Button>
        <Button  onClick={()=> {updateBlogHandler(blog.id)}}>Update blog</Button>

        <div className={st.blogBlock}>
                <Modal active={updateModalActive} setActive={undefined} >
                    <div className={st.modalBlockUpdate}>
                        <div><Button onClick={closeUpdateModalHandler} >X</Button></div>
                            <h4 className={st.titleModal}>Update Blog</h4>
                            <div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={st.modalUpdateTitle}>Name
                            <Input  placeholder='Name' className={st.modalInputUpdate} {...register('name', {
                                required: 'field is required',
                                maxLength: { value: 15, message: 'Max Length 15' },
                            })} />
                        </div>
                        <div>{errors?.name && <p>{errors.name.message || 'Error'}</p>}</div>
                        <div className={st.modalUpdateTitle}>about
                            <Input  placeholder='description' className={st.modalInputUpdate} {...register('description', {
                                required: 'field is required',
                                maxLength: { value: 500, message: 'Max Length 500' },
                            })} />
                        </div>
                        <div>{errors.description && <p>{errors.description.message || 'Error'}</p>}</div>
                        <div className={st.modalUpdateTitle}>website
                            <Input  placeholder='www.xxx.com' className={st.modalInputUpdate} {...register('websiteUrl', { 
                                required: 'field is required' })} />
                        </div>
                        <div>{errors.websiteUrl && <p>{errors.websiteUrl.message || 'Error'}</p>}</div>
                        <Input  className={st.updateButton}  type="submit" value='Update Blog' />
                            </form>
                            </div>
                    </div>
                </Modal>
            <div>
                <img className={st.avatar} src="https://d11a6trkgmumsb.cloudfront.net/original/3X/d/8/d8b5d0a738295345ebd8934b859fa1fca1c8c6ad.jpeg"
                    alt="avatar" />
            </div>

            <div className={st.textBlog}>
                <div>
                    <h5 onClick={() => onClickBlogHandler(blog.id)}>{blog.name}</h5>
                </div>
                <div>
                    <span>Website:</span>
                    <a className={st.link} href={blog.websiteUrl}>{blog.websiteUrl}  </a>
                </div>
                <div className={st.description}>
                    <span>{blog.description}</span>
                </div>
               
            </div>
        </div>
      
    </div>
  )
}

export default Blog
