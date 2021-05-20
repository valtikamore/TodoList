import axios from "axios";
import { FilterValuesType } from "../state/todolists-reducer";

export interface TodolistType {
    id: string
    addedDate: string
    order: number
    title: string
    filter:FilterValuesType
}
interface responseType<T = {}> {
    resultCode: number
    messages: string[],
    data: T
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}
export type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}
const instance = axios.create({
    baseURL : 'https://social-network.samuraijs.com/api/1.1',
    withCredentials:true,
    headers:{
        'API-KEY' : 'f1483392-45ca-4f41-b8a9-ec8e05304fe6'
    }
})

export const todolistsAPI = {
    getTodos() {
        return instance.get<TodolistType[]>('/todo-lists')
    },
    createTodo(title:string) {
        return instance.post<responseType<{item: TodolistType }>>('/todo-lists',{title})
    },
    deleteTodo (todolistId:string) {
        return instance.delete<responseType>(`/todo-lists/${todolistId}`)
    },
    updateTodo (todolistId:string,title:string) {
        return instance.put<responseType>(`/todo-lists/${todolistId}`,{title})
    },
}

export const tasksAPI = {
    getTasks(todolistId:string) {
        return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId:string,title:string) {
        return instance.post<responseType<{item: TaskType }>>(`/todo-lists/${todolistId}/tasks`,{title})
    },
    deleteTask (todolistId:string,taskId:string) {
        return instance.delete<responseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask (todolistId:string,taskId:string,model:UpdateTaskModelType) {
        return instance.put<responseType>(`/todo-lists/${todolistId}`,{todolistId:todolistId,taskId:taskId,model})
    },
}