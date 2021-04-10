import {filteredTasksType, TodoListType} from "../../../AppWithRedux";
import {v1} from "uuid";


export type RemoveTodoListActionType = {
    type: 'REMOVE_TODOLIST'
    todolistId: string
}
export type AddTodoListActionType = {
    type: 'ADD_TODOLIST'
    title: string
    todolistId: string
}
type ChangeTodoListTitleActionType = {
    type: 'CHANGE_TODOLIST_TITLE'
    todolistId: string
    title: string
}
type ChangeTodoListFilterActionType = {
    type: 'CHANGE_TODOLIST_FILTER'
    todolistId: string
    filter: filteredTasksType
}
export type ActionType =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType

export let todoListId1 = v1()
export let todoListId2 = v1()
let initialState: TodoListType[] = [
    {id: todoListId1, title: 'What to learn', filter: 'all'},
    {id: todoListId2, title: 'What to learn', filter: 'all'}
]
export const todoListsReducer = (state = initialState, action: ActionType): TodoListType[] => {
    switch (action.type) {
        case "REMOVE_TODOLIST": {
            return (
                state.filter(tl => tl.id !== action.todolistId)
            )
        }
        case "ADD_TODOLIST": {
            let newTodolist: TodoListType = {id: action.todolistId, title: action.title, filter: 'all'}
            return [newTodolist, ...state]
        }
        case "CHANGE_TODOLIST_TITLE": {
            const todoList = state.find(tl => tl.id === action.todolistId)
            if (todoList) {
                todoList.title = action.title
                return [...state]
            }
            return state
        }
        case "CHANGE_TODOLIST_FILTER": {
            const todoList = state.find(tl => tl.id === action.todolistId)
            if (todoList) {
                todoList.filter = action.filter
                return [...state]
            }
            return state
        }
        default :
            return state
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodoListActionType => {
    return {type: 'REMOVE_TODOLIST', todolistId}
}
export const AddTodoListAC = (title: string): AddTodoListActionType => {
    return {type: 'ADD_TODOLIST', title, todolistId: v1()}
}
export const ChangeTodoListTitleAC = (todolistId: string, title: string): ChangeTodoListTitleActionType => {
    return {type: 'CHANGE_TODOLIST_TITLE', todolistId, title}
}
export const ChangeTodoListFilterAC = (todolistId: string, filter: filteredTasksType): ChangeTodoListFilterActionType => {
    return {type: 'CHANGE_TODOLIST_FILTER', todolistId, filter}
}