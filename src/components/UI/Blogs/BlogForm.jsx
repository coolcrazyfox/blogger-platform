import React, {useState} from 'react';
import SuperInput from "../SuperInput/SuperInput";
import SuperButton from "../SuperButton/SuperButton";
import s from "../../../styles/BlogForm.module.css";
import {AiOutlineClear} from "react-icons/ai";
import SuperTextarea from '../SuperTextarea/SuperTextarea';


const BlogForm = ({create}) => {
    const [blog, setBlog] = useState({image: '', name: '', websiteUrl: '', description: '', createdAt: ''})
    // useEffect(() => {
    //     const timer = setTimeout(() => console.log('test'), 4000)
    //     return () => clearTimeout(timer)
    // }, [])
    const addNewBlog = (e) => {
        e.preventDefault()
        const newBlog = {
            ...blog, id: Date.now()
        }
        create(newBlog)
        setBlog({image: '', name: '', websiteUrl: '', description: '', createdAt: ''})

    }
    return (

        <form  className={s.form}>
            <div className={s.form_container} >
                <SuperInput
                    value={blog.image}
                    onChange={e => setBlog({...blog, image: e.target.value})}
                    type={'text'}
                    placeholder={"Image link"}

                />

                {blog.image && (
                    <div className={s.clear} >
                        <AiOutlineClear onClick={(e) => setBlog({...blog, image: ''})}/>
                    </div>
                )
                }

            </div>

            <div className={s.form_container} >
                <SuperInput
                    value={blog.name}
                    onChange={e => setBlog({...blog, name: e.target.value})}
                    type={'text'}
                    placeholder={"Title"}

                />
                {blog.name && (
                    <div className={s.clear}>
                        <AiOutlineClear  onClick={(e) => setBlog({...blog, name: ''})}/>
                    </div>
                )
                }

            </div>

            <div className={s.form_container} >
                <SuperInput
                    value={blog.websiteUrl}
                    onChange={e => setBlog({...blog, websiteUrl: e.target.value})}
                    type={'text'}
                    placeholder={"Website"}

                />
                {blog.websiteUrl && (
                    <div className={s.clear}>
                        <AiOutlineClear onClick={(e) => setBlog({...blog, websiteUrl: ''})}/>
                    </div>
                )
                }
            </div>

            <div className={s.form_container} >
                <SuperTextarea 
                     value={blog.description}
                    onChange={e => setBlog({...blog, description: e.target.value})}
                    type={'text'}
                    placeholder={"Description"}
                />               
                {blog.description && (
                    <div className={s.clear}>
                        <AiOutlineClear onClick={(e) => setBlog({...blog, description: ''})}/>
                    </div>
                )
                }
            </div>

            <div className={s.form_container} >
                <SuperInput
                    value={blog.createdAt}
                    onChange={e => setBlog({...blog, createdAt: e.target.value})}
                    type={'text'}
                    placeholder={"yyyy-mm-dd"}

                />
                {blog.createdAt && (
                    <div className={s.clear}>
                        <AiOutlineClear onClick={(e) => setBlog({...blog, createdAt: ''})}/>
                    </div>
                )
                }
            </div>
            <SuperButton
                onClick={addNewBlog}
            >
                Add
            </SuperButton>
        </form>


    );
};

export default BlogForm;
