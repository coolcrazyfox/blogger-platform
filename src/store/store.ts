import { combineReducers, configureStore, Middleware } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { BlogsReducer } from "../redux/BlogsReducer";
import { PostsReducer } from "../redux/PostsReducer";

const rootReducer = combineReducers({
    blogs: BlogsReducer,
    posts: PostsReducer,
})

export type RootReducerType = ReturnType<typeof rootReducer>

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})


export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// @ts-ignore
window.store = store;