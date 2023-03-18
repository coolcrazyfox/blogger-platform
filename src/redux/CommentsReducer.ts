import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { commentsAPI } from "../API/BloggerPlatformService"
import { setAppStatusAC } from "./AppReducer"

export type CommentType = {
    id: string
    content: string
    commentatorInfo: CommentatorInfoType
    createdAt: string

}

export type CommentsType = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: CommentType[]
}

type CommentatorInfoType = {
    userId: string
    userLogin: string
}


const initialState: CommentsType = {
    pagesCount: 0,
    page: 0,
    pageSize: 0,
    totalCount: 0,
    items: []
}

export const getCommentsTC = createAsyncThunk(
    'comments/getComments',
    async (param: { postId?: string }, { dispatch, rejectWithValue }) => {
        dispatch(setAppStatusAC({ status: 'loading' }))
        try {
            const res = await commentsAPI.getComments(param.postId)
            return { data: res.data }
        } catch (e: any) {
            //return rejectedWithValue({Error: что то описать})
        } finally {
            dispatch(setAppStatusAC({ status: 'succeeded' }))
        }
    }
)

export const addCommentTC = createAsyncThunk(
    'comments/addComment',
    async (param: { postId: string, content: string }, { dispatch, rejectWithValue }) => {
        dispatch(setAppStatusAC({ status: 'loading' }))
        const accessToken = localStorage.getItem('token')
        try {
            const res = await commentsAPI.addComment(param.postId, param.content, accessToken)
            return { data: res.data }
        } catch (e: any) {
            //return rejectedWithValue({Error: что то описать})
        } finally {
            dispatch(setAppStatusAC({ status: 'succeeded' }))
        }
    }
)

const slice = createSlice({
    name: 'comments',
    initialState: initialState,
    reducers: {

    },
    extraReducers: builder => {
        //Get comments
        builder.addCase(getCommentsTC.fulfilled, (state, action) => {
            if(action.payload) {
                return state = action.payload.data
            }
            
        })
        builder.addCase(getCommentsTC.rejected, (state, { payload }) => {
            //to do something inside
          })
    }
})


export const CommentsReducer = slice.reducer