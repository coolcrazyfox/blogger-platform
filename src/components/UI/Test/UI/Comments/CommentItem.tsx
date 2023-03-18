import React from 'react'
import { CommentType } from '../../../../../redux/CommentsReducer';
import Button from '../Button/Button';
import { EditableSpan } from '../EditableSpan/EditableSpan';
//@ts-ignore
import st from './Comment.module.css'



type CommentItemType = {
    comment: CommentType
}
const CommentItem = ({comment, ...props}: CommentItemType) => {
  return (
    <div className={st.commentBlock}>
        <img className={st.avatar} src="https://w7.pngwing.com/pngs/862/646/png-transparent-beard-hipster-male-man-avatars-xmas-giveaway-icon-thumbnail.png" alt="avatar" />
            <span className={st.name}>{comment.commentatorInfo.userLogin}</span>
            <span className={st.date}>{comment.createdAt}</span>
            <div>
                <EditableSpan title={comment.content} changeTitle={() => { }} />
            </div>
            <Button disabled={false} title={'Remove'} onClick={() => { }} />
      
    </div>
  )
}

export default CommentItem
