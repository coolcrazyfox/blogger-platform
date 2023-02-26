import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { blogsAPI, OneBlogResponseType, AddBlogType, GetBlogsArgsType } from "../API/BloggerPlatformService"
import { PostsType } from "./PostsReducer"


export type  BlogsType = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: BlogType[]
}
export type BlogType = {
    id: string
    name: string
    description: string
    websiteUrl: string
    createdAt?: string
    isMemberShip?: boolean
}
export type BlogsStateType = {
    blogs: BlogsType
    oneBlogPage: OneBlogResponseType
    postsOfOneBlog: PostsType
}
export const getBlogsTC = createAsyncThunk(
    'blogs/getBlogs',
    async (param: {searchNameTerm?: string, sortBy?: string, sortDirection?: string, pageNumber?: number, pageSize?: number}, { dispatch, rejectWithValue }) => {
      try {
        const res = await blogsAPI.getBlogs(param)
        return { data: res.data, }
      } catch (e: any) {
        //return rejectedWithValue({Error: что то описать})
      }
    })
  
  export const getBlogPostsTC = createAsyncThunk(
    'blogs/getBlogPosts',
    async (param: {id: string}, { dispatch, rejectWithValue }) => {
      try {
        const res = await blogsAPI.getBlogPosts(param.id)
        return { data: res.data, blogId: param.id }
      } catch (e: any) {
        //return rejectedWithValue({Error: что то описать})
      }
    }
  )
  
  export const getOneBlogTС = createAsyncThunk(
    'blogs/getOneBlog',
    async (param: {id: string}, { dispatch, rejectWithValue }) => {
      try{
        const res = await blogsAPI.getOneBlog(param.id)
        return {data: res.data}
      }catch(e: any) {
        //return rejectedWithValue({Error: что то описать})
      }
    }
  ) 
  
  export const addBlogTC = createAsyncThunk(
    'blogs/addBlog',
    async (param: {args: AddBlogType}, { dispatch, rejectWithValue }) => {
      try{
        const res = await blogsAPI.addBlog(param.args)
        return {data: res.data}
      }catch (e: any) {
        //return rejectedWithValue({Error: что то описать})
      }
    }
  )
  
  export const removeBlogTC = createAsyncThunk(
    'blogs/removeBlog',
    async (param: {id: string}, { dispatch, rejectWithValue }) =>{
      try{
        await blogsAPI.removeBlog(param.id)
        return param.id
      }catch (e: any) {
        // return rejectWithValue(e)
      }
    }
  )
  
  export const updateBlogTC = createAsyncThunk(
    'blogs/updateBlog',
    async (param: {id: string, args: AddBlogType}, {dispatch, rejectWithValue}) => {
      try{
        await blogsAPI.updateBlog(param.id, param.args)
        return {id: param.id, args: param.args}
      }catch(e: any) {
        
      }
    }
  )
  
  
  
  const initialState: BlogsStateType = {
    blogs: {
      pagesCount: 0,
      page: 0,
      pageSize: 0,
      totalCount: 0,
      items: []
    },
    oneBlogPage: {
      id: "",
      name: "",
      description: "",
      websiteUrl: ""
    },
    postsOfOneBlog: {
      pagesCount: 0,
          page: 0,
          pageSize: 0,
          totalCount: 0,
          items: []
    }
  }
  
  
  const slice = createSlice({
    name: 'blogs',
    initialState: initialState,
    reducers: {
  
    },
    extraReducers: builder => {
      builder.addCase(getBlogsTC.fulfilled, (state, action) => {
        const allBlogs = action.payload?.data
        if(allBlogs) {
          state.blogs = allBlogs
        }
        return state
      })
      //Get Blogs
      builder.addCase(getBlogsTC.rejected, (state, { payload }) => {
        //to do something inside
      })
      builder.addCase(getBlogPostsTC.fulfilled, (state, action) => {
        if(action.payload?.data){
          state.postsOfOneBlog = action.payload.data
        }
        return state
      })
      //Get Blog's posts
      builder.addCase(getBlogPostsTC.rejected, (state, { payload }) => {
        //to do something inside
      })
      //
      builder.addCase(getOneBlogTС.fulfilled, (state, action) =>{
        if(action.payload?.data){
          state.oneBlogPage = action.payload.data
        }
        return state
      })
      //Get one Blog
      builder.addCase(getOneBlogTС.rejected, (state, { payload }) => {
        //to do something inside
      })
      // Add Blog
      builder.addCase(addBlogTC.fulfilled, (state, action) => {
         if(action.payload?.data){
           state.blogs.items.unshift(action.payload.data)
         }
        
        return state
      })
      builder.addCase(addBlogTC.rejected, (state, { payload }) => {
        //to do something inside
      })
      // Remove Blog
      builder.addCase(removeBlogTC.fulfilled, (state, action) => {
         state.blogs.items.forEach((el, i) => el.id === action.payload ? state.blogs.items.splice(i, 1) : el)
        return state
      })
      builder.addCase(removeBlogTC.rejected, (state, { payload }) => {
        //to do something inside
      })
      // Update Blog не правильно
      builder.addCase(updateBlogTC.fulfilled, (state, action) => {
          const items = state.blogs.items.map(b=> b.id === action.payload?.id 
            ? { ...b, name : action.payload.args.name, description: action.payload.args.description,
               websiteUrl: action.payload.args.websiteUrl} : b)
               state.blogs.items = items
        
        return state
      })
      builder.addCase(updateBlogTC.rejected, (state, { payload }) => {
        //to do something inside
      })
    }
  })
  
  export const BlogsReducer = slice.reducer