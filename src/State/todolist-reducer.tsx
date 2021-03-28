import {filteredTasksType, TodoListType} from "../App";
import {v1} from "uuid";
import {FilledTextFieldProps} from "@material-ui/core";


type RemoveTodoListActionType = {
    type:'REMOVE_TODOLIST'
    id:string
}
type AddTodoListActionType = {
    type:'ADD_TODOLIST'
    title:string
}
type ChangeTodoListTitleActionType = {
    type:'CHANGE_TODOLIST_TITLE'
    id: string
    title: string
}
type ChangeTodoListFilterActionType = {
    type:'CHANGE_TODOLIST_FILTER'
    id: string
    filter:filteredTasksType
}
export type ActionType = RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListTitleActionType | ChangeTodoListFilterActionType

export const todoListsReducer = (todoLists:TodoListType[],action:ActionType) => {
    switch (action.type) {
        case "REMOVE_TODOLIST": {
            return (
                todoLists.filter(tl => tl.id !== action.id)
            )
        }
        case "ADD_TODOLIST": {
                const  newTodoListId = v1()
                let newTodolist: TodoListType = {id: newTodoListId, title: action.title, filter: 'all'}
                return [...todoLists,newTodolist]
        }
        case "CHANGE_TODOLIST_TITLE": {
            const todoList = todoLists.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title
                return [...todoLists]
            }
            return todoLists
        }
        case "CHANGE_TODOLIST_FILTER": {
            const  todoList = todoLists.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.filter = action.filter
                return [...todoLists]
            }
            return todoLists
        }
        default :
            return todoLists
    }
}

export const RemoveTodolistAC = (id:string):RemoveTodoListActionType =>  {
    return {type:'REMOVE_TODOLIST',id}
}
export const AddTodoListAC = (title:string):AddTodoListActionType =>  {
    return {type:'ADD_TODOLIST',title}
}
export const ChangeTodoListTitleAC = (id:string,title:string):ChangeTodoListTitleActionType =>  {
    return {type:'CHANGE_TODOLIST_TITLE',id,title}
}
export const ChangeTodoListFilterAC = (id:string,filter:filteredTasksType):ChangeTodoListFilterActionType =>  {
    return {type:'CHANGE_TODOLIST_FILTER',id,filter}
}