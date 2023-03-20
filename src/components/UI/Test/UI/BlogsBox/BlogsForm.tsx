import React from 'react'
import { Input } from '../Input/Input'

const BlogsForm = () => {

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
        dispatch(addBlogTC({ args }))
        setDisable(true) 
        setActiveForModal()
    }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={st.titleInput}>Name
                            <Input placeholder='name' className={st.inputForm} {...register('name', {
                                required: 'field is required',
                                maxLength: { value: 15, message: 'Max Length 15' },
                            })} />
                        </div>
                        <div>{errors?.name && <p>{errors.name.message || 'Error'}</p>}</div>
                        <div className={st.titleInput}>about
                            <Input placeholder='description' className={st.inputForm} {...register('description', {
                                required: 'field is required',
                                maxLength: { value: 500, message: 'Max Length 500' },
                            })} />
                        </div>
                        <div>{errors.description && <p>{errors.description.message || 'Error'}</p>}</div>
                        <div className={st.titleInput}>website
                            <Input placeholder='www.xxx.com' className={st.inputForm} {...register('websiteUrl', { 
                                required: 'field is required' })} />
                        </div>
                        <div>{errors.websiteUrl && <p>{errors.websiteUrl.message || 'Error'}</p>}</div>
                            <Input  className={st.createBlogButton}  type="submit" value='Create blog' />
                    </form>
  )
}

export default BlogsForm
