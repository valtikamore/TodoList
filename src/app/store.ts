import {tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {todolistsReducer} from '../features/TodolistsList/todolists-reducer';
import { combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {appReducer} from './app-reducer'
import {authReducer} from '../features/Login/auth-reducer'
import {configureStore} from "@reduxjs/toolkit";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})
export type RootReducerType = typeof rootReducer
export const store = configureStore({
    reducer:rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

export type AppRootStateType = ReturnType<RootReducerType>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
