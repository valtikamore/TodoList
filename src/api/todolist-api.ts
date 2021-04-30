import axios from "axios"

type TodoType = {
    id:string
    addedDate:string
    order:number
    title:string
}
type CommonTodoType<T = {}> = {
    resultCode: number
    messages: string[]
    fieldsError:string
    data: T
}
type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type commonTaskType = {
    items: TaskType[]
    totalCount: number
    error: string
}
type postAndPutTask<T = {}> = {
    resultCode: number
    messages:string[],
    data: T
}

const instance = axios.create({
    baseURL : 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY':'f79818db-8b08-4e47-aa4a-5d0839f77694'
    }
})
export const todolistAPI = {
    getTodos () {
        return instance.get<TodoType[]>(`/todo-lists`)
    },
    updateTodos (todolistId:string,title:string) {
        return instance.put<CommonTodoType>(`/todo-lists/${todolistId}`, {title})
    },
    deleteTodos (todolistId:string) {
        return instance.delete<CommonTodoType>(`/todo-lists/${todolistId}`)
    },
    createTodos (title:string) {
        return  instance.post<CommonTodoType<{ item:TodoType }>>(`/todo-lists`,{title})
    }
}

export const taskAPI = {
    getTasks (todolistId:string,page:number = 1,count:number=10) {
        return instance.get<commonTaskType>(`/todo-lists/${todolistId}/tasks?page=${page}&count=${count}`)
    },
    createTask (todolistId:string,title:string) {
        return  instance.post<postAndPutTask<TaskType>>(`/todo-lists/${todolistId}/tasks`,{title})
    },
    updateTaks (todolistId:string,taskId:string,title:string) {
        return instance.put<postAndPutTask<TaskType>>(`/todo-lists/${todolistId}/tasks/${taskId}`, {title})
    },
    deleteTaks (todolistId:string,taskId:string) {
        return instance.delete<postAndPutTask<TaskType>>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },

}

