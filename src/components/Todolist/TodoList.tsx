import React, { useCallback, useEffect} from "react";
import {Button,  IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {AddItemForm} from "../AddItemForm/addItemForm";
import {Task} from "../Task/Task";
import {FilteredValuesType} from "../../state/reducers/todolist-reducer/todolist-reducer";
import { useDispatch } from "react-redux";
import {fetchTasksTC} from "../../state/reducers/tasks-reducer/task-reducer";
import {TaskStatuses, TaskType} from "../../api/todolist-api";
import {EditableSpan} from "../EditableSpan/EditableSpan";

type TodoListPropsType = {
    todoListID: string
    title: string
    filter: FilteredValuesType
    tasks: TaskType[]
    addTask: (title: string, todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (newFilterValue: FilteredValuesType, todoListId: string) => void
    changeStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    removeTodolist: (todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    changeTodoListTitle: (newTitle: string, todoListId: string) => void
}


export const TodoList = React.memo((props: TodoListPropsType) => {

    console.log('todolist')
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchTasksTC(props.todoListID))
    },[])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todoListID)
    }, [props.addTask, props.todoListID])
    const onAllClick = useCallback(() => props.changeFilter('all', props.todoListID),[props])
    const onActiveClick = useCallback(() => props.changeFilter('active', props.todoListID),[props])
    const onCompletedClick = useCallback(() => props.changeFilter('completed', props.todoListID),[props])


    const removeTodolist =useCallback (() => props.removeTodolist(props.todoListID),[props.todoListID])

    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(title, props.todoListID)
    }, [props.todoListID])

    let tasksForTodolist = props.tasks
    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }
    const tasks = tasksForTodolist.map(t => (
        <Task
            key={t.id}
            task={t}
            removeTask={props.removeTask}
            changeTaskTitle={props.changeTaskTitle}
            changeStatus={props.changeStatus}
            todolistId={props.todoListID}/>)
    )
    return (
        <div>
            <h3>
                <EditableSpan value={props.title} onChange={changeTodoListTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask}/>
            <ul>
                {tasks}
            </ul>
            <div>
                <Button
                    color={props.filter === 'all' ? 'secondary' : 'primary'} onClick={onAllClick}>All</Button>
                <Button
                    color={props.filter === 'active' ? 'secondary' : 'primary'}
                    onClick={onActiveClick}> Active</Button>
                <Button
                    color={props.filter === 'completed' ? 'secondary' : 'primary'}
                    onClick={onCompletedClick}>Completed</Button>
            </div>
        </div>
    )
})
