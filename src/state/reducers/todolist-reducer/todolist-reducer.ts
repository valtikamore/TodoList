import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../../../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppActionType, setAppStatusAC, setErrorActionType} from "../appReducer/appReducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/errors";


const initialState: Array<TodolistDomainType> =  [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]
export type FilteredValuesType = 'all' | 'completed' | 'active'
export type TodolistDomainType = TodolistType & {
    filter: FilteredValuesType
    entityStatus: RequestStatusType
}
export type addTodolistActionType = ReturnType<typeof addTodolistAC>
export type removeTodolistActionType = ReturnType<typeof removeTodolistAC>
export type setTodolistActionType = ReturnType<typeof setTodosAC>



export const todolistsReducer = (state:TodolistDomainType[] = initialState,action:ActionsType):TodolistDomainType[] => {
    switch (action.type ){
        case "SET-TODOS":{
            return action.todos.map(tl => ({...tl, filter: 'all',entityStatus:'idle'}))
        }
        case "REMOVE-TODOLIST":{
            return state.filter(t => t.id !== action.id)
        }
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all',entityStatus:'idle'}, ...state]
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        }
        case "CHANGE-TODOLIST-ENTITY-STATUS":{
            return state.map(tl => tl.id === action.id ? {...tl,entityStatus:action.entityStatus} : tl)
        }
        default : return   state
    }
}

export const removeTodolistAC = (todolistId:string)=> (
    {type:'REMOVE-TODOLIST',id:todolistId} as const )

export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)

export const  changeTodolistTitleAC = (title:string, id:string) => (
    {type:'CHANGE-TODOLIST-TITLE',title,id}as const)
export const  changeTodolistFilterAC= (filter:FilteredValuesType, id:string) =>(
    {type:'CHANGE-TODOLIST-FILTER',filter,id}) as const
export const setTodosAC = (todos:Array<TodolistType>) => (
    {type:'SET-TODOS',todos}) as const
export const changeTodolistEntityStatusAC = (id:string,entityStatus:RequestStatusType) => ({type:'CHANGE-TODOLIST-ENTITY-STATUS',id,entityStatus} as const )


export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.getTodos()
            .then((res) => {
                dispatch(setTodosAC(res.data))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}
export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTodolistEntityStatusAC(todolistId,'loading'))
        todolistAPI.deleteTodos(todolistId)
            .then((res) => {
                dispatch(removeTodolistAC(todolistId))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.createTodos(title)
            .then((res) => {
                if(res.data.resultCode === 0 ) {
                    dispatch(addTodolistAC(res.data.data.item))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(dispatch,res.data)
                }
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(dispatch,err.message)
                // dispatch(setErrorAppAC(err.message))
                // dispatch(setAppStatusAC('failed'))
            })
    }
}
export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.updateTodos(id, title)
            .then((res) => {
                dispatch(changeTodolistTitleAC(id, title))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodosAC>;
type ActionsType =
    |  ReturnType<typeof removeTodolistAC>
    |  addTodolistActionType
    |  ReturnType<typeof changeTodolistTitleAC>
    |  ReturnType<typeof changeTodolistFilterAC>
    |  removeTodolistActionType
    |  setTodolistActionType
    | ReturnType<typeof changeTodolistEntityStatusAC>
    | setAppActionType
    | setErrorActionType