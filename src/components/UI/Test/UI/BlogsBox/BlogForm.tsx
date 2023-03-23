import React from 'react'
import { Input } from '../Input/Input'

const BlogForm = ({handleSubmit,onSubmit, ...props}) => {
  return (
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
  )
}

export default BlogForm
