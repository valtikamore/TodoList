import {taskAPI, TaskStatuses, TaskType} from "../../../api/todolist-api";
import {Dispatch} from "redux";
import {
    addTodolistActionType,
    removeTodolistActionType,
    setTodolistActionType
} from "../todolist-reducer/todolist-reducer";
import {AppRootStateType} from "../../redux/store";
import {setAppActionType, setAppStatusAC} from "../appReducer/appReducer";
type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

export type TasksStateType = {
    [key: string]: TaskType[]
}
let initialState :TasksStateType = {}

type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof setTasksAC>
    | addTodolistActionType
    | removeTodolistActionType
    | setTodolistActionType
    | setAppActionType

export const removeTaskAC = (taskId:string,todolistId:string) =>  ({type:'REMOVE-TASK',taskId:taskId,todolistId:todolistId}as const)
export const addTaskAC = (task:TaskType) =>  ({type: 'ADD-TASK', task}as const )
export const changeTaskStatusAC = (taskId:string,status: TaskStatuses, todolistId: string) => ( {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId}as const )
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => ({type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}as const )
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>  ({type: 'SET-TASKS', tasks, todolistId} as const)


export const tasksReducer = (state= initialState,action:ActionsType):TasksStateType => {
    switch (action.type ){
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        case "SET_TODOS": {
            let stateCopy = {...state}
            action.todos.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }

        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}

            const tasks = stateCopy[action.task.todoListId];
            const newTasks = [action.task,...tasks ];
            stateCopy[action.task.todoListId] = newTasks;
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, status: action.status} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }

        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, title: action.title} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
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

export const updateTaskStatusTC = (todolistId:string,status:number,taskId:string) =>  (dispatch:Dispatch,getState:() => AppRootStateType) => {
        dispatch(setAppStatusAC('loading'))
        let state = getState()
        let allTasks = state.tasks
        let tasksForCurrnetTodolost = allTasks[todolistId]

        let findTask = tasksForCurrnetTodolost.find((t:TaskType) => {
            return t.id === taskId
        })
        if(findTask) {
            const model :UpdateTaskModelType = {
                title: findTask.title,
                startDate: findTask.startDate,
                priority: findTask.priority,
                description: findTask.description,
                deadline: findTask.deadline,
                status: status
            }
            taskAPI.updateTask(todolistId,taskId,model)
                .then((res) => {
                    let updatedTaskStatus = res.data.data.item.status
                    dispatch(changeTaskStatusAC(taskId,updatedTaskStatus,todolistId))
                    dispatch(setAppStatusAC('succeeded'))
                })
        }

}