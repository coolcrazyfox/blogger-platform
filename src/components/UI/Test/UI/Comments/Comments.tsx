import React, { ChangeEvent, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../../../../store/store'

type CommentsType = {
  postId: string
}

const Comments = ({postId, ...props}:CommentsType) => {
  const [content,  setContent]= useState<string>('')
  const [error, setError]= useState<string | null>('')
  const {page, pageSize, items, pagesCount, totalCount} = useSelector(selectComments)

    const dispatch = useAppDispatch()

   
    const canclelButtonHandler = () => {
        setContent('')
    }

    const sendCommentHandler = () => {
        if (content.length > 20 && content.length < 300) {
            dispatch(addCommentTC({ postId: postId, content: content }))
            setContent('')
        } else {
            setError('Min length 20 and Max length 300')
        }

    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setContent(e.currentTarget.value)
        setError(null)
    }
  return (
    <div>
      
    </div>
  )
}

export default Comments
