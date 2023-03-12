 import { createSlice, PayloadAction } from "@reduxjs/toolkit";

 export type errorType = string | null;
 export type RequestStatusType = 'succeeded' | 'loading'

 export type AppReducerType = {
    appStatus : RequestStatusType
    error: errorType
 }
 
 const initialState: AppReducerType = {
    appStatus: 'succeeded' as RequestStatusType,
    error: null as errorType,
  }
  
  const slice = createSlice({
      name: 'app',
      initialState: initialState,
      reducers: {
          setAppStatusAC(state, action: PayloadAction<{status: RequestStatusType}>){
              state.appStatus = action.payload.status
          }
      },
  })
  
  export const appReducer = slice.reducer
  
  export const {setAppStatusAC} = slice.actions