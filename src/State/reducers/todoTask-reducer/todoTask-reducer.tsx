import { v1 } from "uuid";
import {TasksForTodoListType} from "../../../AppWithRedux";
import {
    AddTodoListActionType,
    RemoveTodoListActionType,
    todoListId1,
    todoListId2
} from "../todolist-reducer/todolist-reducer";


type RemoveTaskActionType = {
    type:'REMOVE_TASK'
    taskId:string
    todolistId:string
}
type AddTaskActionType = {
    type:'ADD_TASK'
    title:string
    todolistId:string
}
type ChangeTaskTitleActionType = {
    type:'CHANGE_TASK_TITLE'
    taskId:string
    newTitle:string
    todolistId: string
}
type ChangeTaskStatusActionType = {
    type: 'CHANGE_TASK_STATUS'
    todolistId: string
    taskId: string
    isDoneTask: boolean
}
type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskTitleActionType
    | ChangeTaskStatusActionType
    | AddTodoListActionType
    | RemoveTodoListActionType

let initialState: TasksForTodoListType = {
    [todoListId1]: [
        {id: v1(), title: 'Html&css', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Rest API', isDone: false},
    ],
    [todoListId2]: [
        {id: v1(), title: 'GraphQL', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false},
    ]
}
export const todoTaskReducer = (state = initialState, action: ActionType): TasksForTodoListType => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)
            }
        }
        case "ADD_TASK": {
            const newTask = {
                id: v1(),
                title:action.title,
                isDone:false
            }
            return {
                ...state,
                [action.todolistId]:[newTask,...state[action.todolistId]]
            }
        }
        case "CHANGE_TASK_TITLE":{
            return {
                ...state,
                [action.todolistId]:state[action.todolistId].map(task =>{
                    if(task.id === action.taskId) {
                        return {...task,title:action.newTitle}
                    } else return task
                } )
            }
        }
        case "CHANGE_TASK_STATUS":{
            return {
                ...state,
                [action.todolistId]:state[action.todolistId].map(task => {
                    if(task.id === action.taskId) {
                        return {...task,isDone:action.isDoneTask}
                    } else return task
                })
            }
        }
        case 'ADD_TODOLIST' : {
            return {...state,[action.todolistId]:[]}
        }
        case "REMOVE_TODOLIST":{
            let copyState =  {...state}
            delete copyState[action.todolistId]
            return copyState
        }
        default :
            return state
    }
}


export const RemoveTaskAC = (taskId:string,todolistId:string):RemoveTaskActionType =>  {
    return {type:'REMOVE_TASK',taskId,todolistId}
}
export const AddTaskAC = (title:string,todolistId:string):AddTaskActionType =>  {
    return {type:'ADD_TASK',title,todolistId}
}
export const ChangeTaskTitleAC = (taskId:string,newTitle:string,todolistId:string):ChangeTaskTitleActionType => {
    return {type: 'CHANGE_TASK_TITLE', taskId, newTitle, todolistId}
}
export const ChangeTaskStatusAC = (todolistId:string,taskId:string,isDoneTask:boolean):ChangeTaskStatusActionType =>  {
    return {type:'CHANGE_TASK_STATUS',todolistId,taskId,isDoneTask}
}