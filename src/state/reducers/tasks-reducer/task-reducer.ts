import {
    taskAPI,
    TaskPriorities,
    TaskStatuses,
    TaskType,
    UpdateTaskModelType
} from "../../../api/todolist-api";
import {Dispatch} from "redux";
import {
    AddTodolistActionType,
    RemoveTodolistActionType, setTodolistActionType,
    SetTodolistsActionType
} from "../todolist-reducer/todolist-reducer";
import {AppRootStateType} from "../../redux/store";
import {setAppActionType, setAppStatusAC, setErrorActionType} from "../appReducer/appReducer";
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export type TasksStateType = {
    [key: string]: TaskType[]
}
let initialState :TasksStateType = {}

type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasksAC>
    | setAppActionType
    | setErrorActionType
    | setTodolistActionType



export const tasksReducer = (state= initialState,action:ActionsType):TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST':
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        case 'SET-TODOS': {
            const copyState = {...state}
            action.todos.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state
    }
}
//Actios
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', taskId, todolistId} as const)
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    ({type: 'UPDATE-TASK', model, todolistId, taskId} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId} as const)

//Thunk

export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
        taskAPI.getTasks(todolistId)
            .then((res) => {
                let tasks = res.data.items
                dispatch(setTasksAC(tasks, todolistId))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
export const removeTaskTC = (todolistId: string, taskId:string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
        taskAPI.deleteTaks(todolistId,taskId)
            .then((res) => {
                dispatch(removeTaskAC(taskId, todolistId))
                dispatch(setAppStatusAC('succeeded'))
            })
}
export const addTaskTC = (todolistId: string, title:string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
        taskAPI.createTask(todolistId,title)
            .then((res) => {
                let newTask = res.data.data.item
                dispatch(addTaskAC(newTask))
                dispatch(setAppStatusAC('succeeded'))
            })
    }

export const updateTaskStatusTC = (todolistId:string,domainModel: UpdateDomainTaskModelType,taskId:string) =>  (dispatch:Dispatch,getState:() => AppRootStateType) => {
        dispatch(setAppStatusAC('loading'))
        let state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)

    if (!task) {
        //throw new Error("task not found in the state");
        console.warn('task not found in the state')
        return
    }
    const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...domainModel
    }
    taskAPI.updateTask(todolistId, taskId, apiModel)
        .then((res) => {
            const action = updateTaskAC(taskId, domainModel, todolistId)
            dispatch(action)
            dispatch(setAppStatusAC('succeeded'))
        })

}