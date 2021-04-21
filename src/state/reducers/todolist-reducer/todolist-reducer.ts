import {FilteredValuesType, TodoListStateType} from "../../../components/App/AppRedux";
import {v1} from "uuid";

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
let initialState:TodoListStateType[] = []
 type ActionsType = removeTodolistActionType | addTodolistActionType | changeTodolistTitleActionType | changeTodolistFilterActionType

export const todolistsReducer = (state= initialState,action:ActionsType):TodoListStateType[] => {
    switch (action.type ){
        case "REMOVE-TODOLIST":{
            return state.filter(t => t.id !== action.id)
        }
        case "ADD-TODOLIST": {
            const newTodoList: TodoListStateType = {
                id: action.todolistId,
                title:action.title,
                filter: 'all'
            }
            return [...state,newTodoList]
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