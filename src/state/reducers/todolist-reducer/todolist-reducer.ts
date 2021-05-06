import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../../../api/todolist-api";
import {Dispatch} from "redux";

export type removeTodolistActionType = {
    type : 'REMOVE-TODOLIST'
    id:string
}
export type addTodolistActionType = {
    type:'ADD-TODOLIST'
    title:string
    todolistId :string
}
type changeTodolistTitleActionType = {
    type:'CHANGE-TODOLIST-TITLE'
    title:string
    id:string
}
type changeTodolistFilterActionType = {
    type:'CHANGE-TODOLIST-FILTER'
    filter:FilteredValuesType
    id:string
}
const initialState: Array<TodolistDomainType> =  [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]
export type FilteredValuesType = 'all' | 'completed' | 'active'
export type TodolistDomainType = TodolistType & {
    filter: FilteredValuesType
}

 type ActionsType =
     removeTodolistActionType |
     addTodolistActionType |
     changeTodolistTitleActionType |
     changeTodolistFilterActionType |
     SetTodosActionType

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

export const removeTodolistAC = (todolistId:string):removeTodolistActionType => {
    return {type:'REMOVE-TODOLIST',id:todolistId}
}
export const addTodolistAC = (title:string):addTodolistActionType => {
    return {type:'ADD-TODOLIST',title,todolistId:v1()}
}
export const  changeTodolistTitleAC= (title:string, id:string):changeTodolistTitleActionType => {
    return {type:'CHANGE-TODOLIST-TITLE',title,id}
}
export const  changeTodolistFilterAC= (filter:FilteredValuesType, id:string):changeTodolistFilterActionType => {
    return {type:'CHANGE-TODOLIST-FILTER',filter,id}
}
export const setTodosAC = (todos:Array<TodolistType>) => {
    return {type:'SET_TODOS',todos} as const
}
export type SetTodosActionType = ReturnType<typeof setTodosAC>

export const setTodosThunk = (dispatch:Dispatch,getState:any) => {
    //what thunk can to do
    //1 side-effects
    todolistAPI.getTodos()
        .then((res) => {
            let todos = res.data
            //2 dispatch actions or other thyynk()
            dispatch(setTodosAC(todos))
        })
}