import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { addUserType, usersAPI } from "../api/bloggerPlatformAPI"
import { RootState } from "../store/store"

export type UsersType = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: UserType[]
}

export type UserType = {
    id: string
    login: string
    email: string
    createdAt: string
}

const initialState: UsersType = {
    pagesCount: 0,
    page: 0,
    pageSize: 0,
    totalCount: 0,
    items: []
}

export const getUsersTC = createAsyncThunk(
    'users/getUsers',
    async (param: { sortBy?: string, sortDirection?: string, pageNumber?: number, pageSize?: number, searchLoginTerm?: string, searchEmailTerm?: string }, { dispatch, rejectWithValue }) => {
        try {
            const res = await usersAPI.getUsers(param)
            return res.data
        } catch (e: any) {
            //return rejectedWithValue({Error: что то описать})
        }
    }
)

export const addUserTC = createAsyncThunk(
    'users/addUser',
    async (param: addUserType, { dispatch, rejectWithValue }) => {
        try {
            const res = await usersAPI.addUser(param)
            dispatch(getUsersTC({}))
            return res.data
        } catch (e: any) {
            //return rejectedWithValue({Error: что то описать})
        }
    }
)

export const removeUserTC = createAsyncThunk(
    'users/removeUser',
    async(param: {id: string}, { dispatch, getState,  rejectWithValue }) => {
       const allState = getState() as RootState
       const page = allState.users.page
        try{
            await usersAPI.removeUser(param.id)
            dispatch(getUsersTC({pageNumber: page}))
            return param.id
        }catch (e: any) {
            //return rejectedWithValue({Error: что то описать})
        }
    }
)

const slice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
       
    },
    extraReducers: builder => {
        //Get users
        builder.addCase(getUsersTC.fulfilled, (state, action) => {
            const users = action.payload
            if (users) {
                return state = users
            }
        })
        builder.addCase(getUsersTC.rejected, (state, { payload }) => {
            //to do something inside
        })
        //Add User
        builder.addCase(addUserTC.fulfilled, (state, action) => {
            const user = action.payload
            user && state.items.unshift(user)
            return state
        })
        builder.addCase(addUserTC.rejected, (state, { payload }) => {
            //to do something inside
        })
        //Remove User
        builder.addCase(removeUserTC.fulfilled, (state, action) => {
            state.items.forEach((el, i) => el.id === action.payload ? state.items.splice(i, 1) : el)
            return state
        })
        builder.addCase(removeUserTC.rejected, (state, { payload }) => {
            //to do something inside
        })
    }
})

export const UsersReducer = slice.reducer