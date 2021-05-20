
import {todolistsAPI, TodolistType} from "../api/todolistAPI";
import {Dispatch} from "redux";


export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    todolist:TodolistType
}
export type setTodolistActionType = {
    type: 'SET-TODOLISTS',
    todolists: TodolistType[]
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | setTodolistActionType

export type FilterValuesType = "all" | "active" | "completed";


export type  TodolistDomainType = TodolistType & {
    filter:FilterValuesType
}

const initialState: Array<TodolistDomainType> =  []
export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id != action.id)
        }
        case 'ADD-TODOLIST': {
            const newTodo:TodolistDomainType = {...action.todolist,filter:'all'}
            return [newTodo,...state]
        }
        case "SET-TODOLISTS": {
            return action.todolists.map(tl => ({
                ...tl,
                filter:'all'
            }) )
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state]
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (todolist:TodolistType): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', todolist}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}
export const setTodolistsAC = (todolists:TodolistType[]): setTodolistActionType => {
    return { type: 'SET-TODOLISTS', todolists}
}
//thunks

export const fetchTodolistsTC = () =>  (dispatch: Dispatch) => {
        todolistsAPI.getTodos()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
            })
}
export const removeTodolistTC = (todolistId:string) =>  (dispatch: Dispatch) => {
    todolistsAPI.deleteTodo(todolistId)
        .then((res) => {
            dispatch(removeTodolistAC(todolistId))
        })
}
