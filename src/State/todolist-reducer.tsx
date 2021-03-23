import {filteredTasksType, TodoListType} from "../App";
import {v1} from "uuid";


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
    title: string
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