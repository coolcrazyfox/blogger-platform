import { RootReducerType } from "../../store/store";


export const selectBlogs = (state: RootReducerType) => state.blogs.blogs.items
export const selectBlogsQuery = (state: RootReducerType) => state.blogs.blogs
export const selectBlogPage = (state: RootReducerType) => state.blogs.oneBlogPage
export const postsOfOneBlog = (state: RootReducerType) => state.blogs.postsOfOneBlog