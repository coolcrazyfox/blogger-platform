import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreatePostType, postsAPI } from "../api/bloggerPlatformAPI";
import { getBlogPostsTC } from "./BlogReducer";

export type PostsType = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: PostType[]
}

export type PostType = {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string,
    blogName: string
    createdAt: string
}

type initialStateType = {
    posts : PostsType
    onePost: PostType
}



export const getPostsTC = createAsyncThunk(
    'posts/getPosts',
    async (param:{pageNumber?: number, pageSize?: number, sortBy?: string,sortDirection?: string}, { dispatch, rejectWithValue }) => {
        try {
            const res = await postsAPI.getPosts(param)
            return { data: res.data }
        } catch (e: any) {
            //return rejectedWithValue({Error: что то описать}) 
        }
    }
)

export const getPostTC = createAsyncThunk(
    'posts/getPost',
    async (param: { id: string }, { dispatch, rejectWithValue }) => {
        try {
            const res = await postsAPI.getPost(param.id)
            return { data: res.data }
        } catch (e: any) {
            //return rejectedWithValue({Error: что то описать}) 
        }
    }
)

export const addPostTC = createAsyncThunk(
    'posts/createPost',
    async (param: {args: CreatePostType, blogId: string}, {dispatch, rejectWithValue}) => {
        try{
            const res = await postsAPI.addPost(param.args)
            dispatch(getBlogPostsTC({id: param.args.blogId}))
            return {data: res.data}
            
        } catch (e: any) {
            //return rejectedWithValue({Error: что то описать}) 
        }
    }
)

export const removePostTC = createAsyncThunk(
    'posts/removePost',
    async (param : {id: string, blogId?: string}, {dispatch, rejectWithValue}) => {
        try {
            const res = await postsAPI.removePost(param.id)
            if (param.blogId) {
                dispatch(getBlogPostsTC({id: param.blogId}))
            }
            return param.id
        }catch (e: any) {
            //return rejectedWithValue({Error: что то описать}) 
        }
    }
)

export const updatePostTC = createAsyncThunk(
    'posts/updatePost',
    async (param: {id: string, args: CreatePostType}, {dispatch, rejectWithValue}) => {
        try{
            const res = await postsAPI.updatePost(param.id, param.args)
            return {id: param.id, args: param.args}
        }catch (e: any) {
            //return rejectedWithValue({Error: что то описать}) 
        }
    }
)

const initialState: initialStateType = {
    posts: {
        pagesCount: 0,
        page: 0,
        pageSize: 10,
        totalCount: 0,
        items: []
    },
    onePost: {
        id: "",
        title: "",
        shortDescription: "",
        content: "",
        blogId: "",
        blogName: "",
        createdAt: ""
    }
}

const slice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {

    },
    extraReducers: builder => {
        //Get all posts
        builder.addCase(getPostsTC.fulfilled, (state, action) => {
            if(action.payload?.data){
                state.posts = action.payload?.data
            }
            return state
        })
        builder.addCase(getPostsTC.rejected, (state, { payload }) => {
            //to do something inside
        })
        //Get one post
        builder.addCase(getPostTC.fulfilled, (state, action) => {
            if(action.payload?.data){
                state.onePost = action.payload?.data
            }
            return state
        })
        builder.addCase(getPostTC.rejected, (state, { payload }) => {
            //to do something inside
        })
        //Create post
        builder.addCase(addPostTC.fulfilled, (state, action) => {
            return state
        })
        builder.addCase(addPostTC.rejected, (state, { payload }) => {
            //to do something inside
        })
        //Remove post
        builder.addCase(removePostTC.fulfilled, (state, action) => {
            state.posts.items.forEach((el, i) => el.id === action.payload ? state.posts.items.splice(i, 1) : el)
            return state
        })
        builder.addCase(removePostTC.rejected, (state, { payload }) => {
            //to do something inside
        })
        //Update post
        builder.addCase(updatePostTC.fulfilled, (state, action) => {
            if(action.payload?.args){
                state.onePost = {...state.onePost, title: action.payload?.args.title, 
                        shortDescription: action.payload?.args.shortDescription, content: action.payload?.args.content}
            }  
            return state
        })
        builder.addCase(updatePostTC.rejected, (state, { payload }) => {
            //to do something inside
        })
    }
})

export const PostsReducer = slice.reducer