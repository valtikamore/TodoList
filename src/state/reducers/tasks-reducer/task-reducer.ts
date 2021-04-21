import { TasksStateType, TaskType} from "../../../components/App/AppRedux";
import {v1} from "uuid";
import { addTodolistActionType, removeTodolistActionType } from "../todolist-reducer/todolist-reducer";

type removeTaskActionType = {
    type : 'REMOVE-TASK'
    taskId:string
    todolistId:string

}
type addTaskActionType = {
    type:'ADD-TASK'
    title:string
    todolistId:string
}
type changeTaskStatusActionType = {
    type:'CHANGE-TASK-STATUS'
    taskId:string
    isDoneTask:boolean
    todolistId:string
}
type changeTaskTitleActionType = {
    type:'CHANGE-TASK-TITLE'
    taskId:string
    newTitle:string
    todolistId:string
}

let initialState :TasksStateType = {}
export type ActionsType =removeTaskActionType | addTaskActionType | changeTaskStatusActionType | changeTaskTitleActionType | addTodolistActionType | removeTodolistActionType

export const tasksReducer = (state= initialState,action:ActionsType):TasksStateType => {
    switch (action.type ){
        case "REMOVE-TASK":{
            return {
                ...state,
                [action.todolistId]:state[action.todolistId].filter(task => task.id !== action.taskId)
            }
        }
        case "ADD-TASK": {
            const newTask:TaskType = {
                id: v1(),
                title: action.title,
                isDone: false,
            }
            return {
                ...state,
                [action.todolistId] : [newTask,...state[action.todolistId]]}

        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.todolistId] : state[action.todolistId].map(task => {
                    if (task.id === action.taskId) {
                        return {...task,isDone : action.isDoneTask}
                    } else {
                        return task
                    }
                })
            }
        }
        case "CHANGE-TASK-TITLE":{
            return {
                ...state,
                [action.todolistId] : state[action.todolistId].map(task => {
                    if (task.id === action.taskId) {
                        return {...task,title : action.newTitle}
                    } else {
                        return task
                    }
                })
            }
        }
        case "ADD-TODOLIST": {
            let todolistId = action.todolistId
            return {...state,[todolistId]:[]}
        }
        case "REMOVE-TODOLIST":{
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        default : return state
    }
}

export const removeTaskAC = (taskId:string,todolistId:string):removeTaskActionType => {
    return {type:'REMOVE-TASK',taskId:taskId,todolistId:todolistId}
}
export const addTaskAC = (title:string,todolistId:string):addTaskActionType => {
    return {type:'ADD-TASK',title,todolistId}
}
export const changeTaskStatusAC = (taskId:string,isDoneTask:boolean,todolistId:string):changeTaskStatusActionType => {
    return {type:'CHANGE-TASK-STATUS',taskId,isDoneTask,todolistId}
}
export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string):changeTaskTitleActionType => {
    return {type:'CHANGE-TASK-TITLE',taskId,newTitle,todolistId}
}


