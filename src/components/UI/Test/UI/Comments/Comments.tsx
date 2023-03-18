import React, { ChangeEvent, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../../../../store/store'
import Button from '../Button/Button'
//@ts-ignore
import st from './Comments.module.css'
import CommentItem from './CommentItem';
import { selectComments } from '../../../../../redux/selectors/comments-selectors'
import { addCommentTC } from '../../../../../redux/CommentsReducer'

type CommentsType = {
  postId: string
}

const Comments = ({postId, ...props}:CommentsType) => {
  const [content,  setContent]= useState<string>('')
  const [error, setError]= useState<string | null>('')
  const {page, pageSize, items, pagesCount, totalCount} = useSelector(selectComments)

    const dispatch = useAppDispatch()

   
    const cancelBtnHandler = () => {
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
    <div className={st.commentsBlock}>
            <h3 className={st.title}>{`Comments(${totalCount})`}</h3>
            <input value={content} className={st.comment} onChange={onChangeHandler} type="text" placeholder='Provide your comment...' />
            {error && <div className={st.error}>{error}</div>}
            <div>
                <Button disabled={false} title={'Cancel'} onClick={cancelBtnHandler} />
                <Button disabled={false} title={'Send your comment'} onClick={sendCommentHandler} />
            </div>
            {
              items.map(c => {
                return (
                    <div key={c.id}>
                        <CommentItem comment={c} />
                    </div>
                )
              }) 
            }
            <div className={st.showMore}>
            <Button disabled={false}  onClick={cancelBtnHandler} >Show more</Button>
            </div>
        </div>
  )
}

export default Comments
