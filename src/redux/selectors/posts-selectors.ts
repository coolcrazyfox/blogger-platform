import { RootReducerType } from "../../store/store";


export const selectAllPosts = (state: RootReducerType) => state.posts.posts.items
export const selectPosts = (state: RootReducerType) => state.posts.posts
export const selectOnePost = (state: RootReducerType) => state.posts.onePost