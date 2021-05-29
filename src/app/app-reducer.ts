import {Dispatch} from 'redux'
import {authAPI} from '../api/todolists-api'
import {setIsLoggedInAC} from '../features/Login/auth-reducer'
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    status: 'idle',
    error: null as null | string,
    isInitialized: false
}
const slice = createSlice({
    initialState:initialState,
    name:'app',
    reducers:{
        setAppStatusAC(state,actions:PayloadAction<{status:RequestStatusType}>) {
            state.status = actions.payload.status
        },
        setAppErrorAC(state,actions:PayloadAction<{error:string | null}>) {
            state.error = actions.payload.error
        },
        setAppInitializedAC(state,actions:PayloadAction<{isInitialized:boolean}>) {
            state.isInitialized = actions.payload.isInitialized
        }
    }
})
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'


export const appReducer = slice.reducer
export const {setAppInitializedAC,setAppStatusAC,setAppErrorAC} = slice.actions


export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    // true когда приложение проинициализировалось (проверили юзера, настройки получили и т.д.)
    isInitialized: boolean
}

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}));
        }
        dispatch(setAppInitializedAC({isInitialized:true}));
    })
}

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>

