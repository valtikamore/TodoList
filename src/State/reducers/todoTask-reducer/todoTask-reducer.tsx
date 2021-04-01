import { TasksForTodoListType} from "../../../App";


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


 type ActionType = RemoveTaskActionType | AddTaskActionType

export const todoListsReducer = (state:TasksForTodoListType,action:ActionType):TasksForTodoListType => {
    switch (action.type) {
        case 'REMOVE_TASK':{
            return {
                ...state,
                [action.todolistId] : state[action.todolistId].filter(task => task.id !== action.taskId)
            }
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
// export const ChangeTaskTitleAC = (id:string,title:string):ChangeTodoListTitleActionType =>  {
//     return {type:'CHANGE_TODOLIST_TITLE',id,title}
// }
// export const ChangeTaskStatusAC = (id:string,filter:filteredTasksType):ChangeTodoListFilterActionType =>  {
//     return {type:'CHANGE_TODOLIST_FILTER',id,filter}
// }