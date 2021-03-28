import {FilteredValuesType, TodoListStateType} from "../../App"
import {v1} from "uuid";


type removeTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type addTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
}
export type changeTodolistTitle = {
    type: 'CHANGE-TODOLIST-TITLE',
    title: string
    id: string
}
export type changeTodolistFilter = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilteredValuesType
}


type ActionType = removeTodolistActionType | addTodolistActionType | changeTodolistTitle | changeTodolistFilter

export const todolistReducer = (todoLists: TodoListStateType[], action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return [...todoLists.filter(t => t.id !== action.id)]
        }

        case 'ADD-TODOLIST': {
            const newTodoListId = v1()
            const newTodoList: TodoListStateType = {
                id: newTodoListId, title: action.title, filter: 'all'
            }
            return [...todoLists, newTodoList]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todoList = todoLists.find(t => t.id === action.id)
            if (todoList) {
                todoList.title = action.title
                return [
                    ...todoLists
                ]
            }
            return todoLists
        }
        case "CHANGE-TODOLIST-FILTER": {
            const todoList = todoLists.find(t => t.id === action.id)
            if (todoList) {
                todoList.filter = action.filter
                return [...todoLists]
            }
            return todoLists
        }
        default :
            throw new Error('error')
    }
}

export const RemoveTodolistAC = (id: string): removeTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id}
}
export const AddTodolistAC = (title: string): addTodolistActionType => {
    return {type: 'ADD-TODOLIST', title}
}

export const ChangeTodolistAC = (title: string, id: string): changeTodolistTitle => {
    return {type: 'CHANGE-TODOLIST-TITLE', title, id}
}

export const ChangeFilterTodolistAC = (id: string, filter: FilteredValuesType): changeTodolistFilter => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter}
}


