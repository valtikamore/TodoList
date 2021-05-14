
import {Dispatch} from "redux";
import {ResponseType} from '../api/todolist-api'
import {setAppActionType, setAppStatusAC, setErrorActionType, setErrorAppAC} from "../state/reducers/appReducer/appReducer";



export const handleServerAppError = <T>(dispatch:Dispatch<ErrorsActionType>,data:ResponseType<T>) => {
    if(data.messages.length) {
        dispatch(setErrorAppAC(data.messages[0]))
    } else {
        dispatch(setErrorAppAC('ERROR'))
    }
    dispatch(setAppStatusAC('failed'))
}



export const handleServerNetworkError = (dispatch:Dispatch<ErrorsActionType>,message:string) => {
    dispatch(setErrorAppAC(message))
    dispatch(setAppStatusAC('failed'))
}
type ErrorsActionType = setAppActionType | setErrorActionType