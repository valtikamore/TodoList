import {FilteredValuesType, TodoListStateType} from "../../App";
import {v1} from "uuid";

type removeTodolistActionType = {
    type : 'REMOVE-TODOLIST'
    id:string
}
type addTodolistActionType = {
    type:'ADD-TODOLIST'
    title:string
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

 type ActionsType = removeTodolistActionType | addTodolistActionType | changeTodolistTitleActionType | changeTodolistFilterActionType

export const todolistsReducer = (state:TodoListStateType[],action:ActionsType):TodoListStateType[] => {
    switch (action.type ){
        case "REMOVE-TODOLIST":{
            return state.filter(t => t.id !== action.id)
        }
        case "ADD-TODOLIST": {
            const newTodoListId = v1()
            const newTodoList: TodoListStateType = {
                id: newTodoListId,
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
                todoList.filter = 'completed'
            }
            return [...state]
        }
        default : return   state
    }
}

export const RemoveTodolistAC = (todolistId:string):removeTodolistActionType => {
    return {type:'REMOVE-TODOLIST',id:todolistId}
}
export const AddTodolistAC = (title:string):addTodolistActionType => {
    return {type:'ADD-TODOLIST',title}
}

export const  ChangeTodolistTitleAC= (title:string,id:string):changeTodolistTitleActionType => {
    return {type:'CHANGE-TODOLIST-TITLE',title,id}
}
export const  ChangeTodolistFilterAC= (filter:FilteredValuesType,id:string):changeTodolistFilterActionType => {
    return {type:'CHANGE-TODOLIST-FILTER',filter,id}
}