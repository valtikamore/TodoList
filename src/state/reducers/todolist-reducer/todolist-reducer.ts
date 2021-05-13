import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../../../api/todolist-api";
import {Dispatch} from "redux";
import {setAppStatusAC} from "../appReducer/appReducer";


const initialState: Array<TodolistDomainType> =  [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]
export type FilteredValuesType = 'all' | 'completed' | 'active'
export type TodolistDomainType = TodolistType & {
    filter: FilteredValuesType
}
export type addTodolistActionType = ReturnType<typeof addTodolistAC>
export type removeTodolistActionType = ReturnType<typeof removeTodolistAC>
export type setTodolistActionType = ReturnType<typeof setTodosAC>

 type ActionsType =
     |  ReturnType<typeof removeTodolistAC>
     |  addTodolistActionType
     |  ReturnType<typeof changeTodolistTitleAC>
     |  ReturnType<typeof changeTodolistFilterAC>
     |  removeTodolistActionType
     |  setTodolistActionType

export const todolistsReducer = (state:TodolistDomainType[] = initialState,action:ActionsType):TodolistDomainType[] => {
    switch (action.type ){
        case "SET_TODOS":{
            let a : any  = action.todos.map((tl) => {
                return {...tl,filter:'all'}
            })
            return a
        }
        case "REMOVE-TODOLIST":{
            return state.filter(t => t.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            const todoList = state.find(t => t.id === action.id)
            if (todoList) {
               todoList.title = action.title
            }
           return [...state]
        }
        case "CHANGE-TODOLIST-FILTER": {
            const todoList = state.find(t => t.id === action.id)
            if (todoList) {
                todoList.filter = action.filter
            }
            return [...state]
        }
        default : return   state
    }
}

export const removeTodolistAC = (todolistId:string)=> (
    {type:'REMOVE-TODOLIST',id:todolistId} as const )
export const addTodolistAC = (title:string) => (
    {type:'ADD-TODOLIST',title,todolistId:v1()}as const)
export const  changeTodolistTitleAC = (title:string, id:string) => (
    {type:'CHANGE-TODOLIST-TITLE',title,id}as const)
export const  changeTodolistFilterAC= (filter:FilteredValuesType, id:string) =>(
    {type:'CHANGE-TODOLIST-FILTER',filter,id}) as const
export const setTodosAC = (todos:Array<TodolistType>) => (
    {type:'SET_TODOS',todos}) as const



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
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                dispatch(removeTodolistAC(todolistId))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.createTodolist(title)
            .then((res) => {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}
export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.updateTodolist(id, title)
            .then((res) => {
                dispatch(changeTodolistTitleAC(id, title))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}