import React, { useCallback, useEffect} from "react";
import {Button, Grid, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

import {Task} from "../Task/Task";
import {FilteredValuesType} from "../../state/reducers/todolist-reducer/todolist-reducer";
import { useDispatch } from "react-redux";
import {fetchTasksTC} from "../../state/reducers/tasks-reducer/task-reducer";
import {TaskStatuses, TaskType} from "../../api/todolist-api";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {RequestStatusType} from "../../state/reducers/appReducer/appReducer";
import {AddItemForm} from "../AddItemForm/additemForm";

type TodoListPropsType = {
    id: string
    title: string
    filter: FilteredValuesType
    tasks: TaskType[]
    addTask: (title: string, todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (newFilterValue: FilteredValuesType, todoListId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    removeTodolist: (todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    changeTodolistTitle: (newTitle: string, todoListId: string) => void
    entityStatus:RequestStatusType
}


export const Todolist = React.memo((props: TodoListPropsType) => {
    console.log('Todolist called')

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    },[])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const removeTodolist = useCallback (() => props.removeTodolist(props.id),[props.id])

    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodolistTitle(title, props.id)
    }, [props.id, props.changeTodolistTitle])

    const onAllClick = useCallback(() => props.changeFilter('all', props.id),[props.id, props.changeFilter])
    const onActiveClick = useCallback(() => props.changeFilter('active', props.id),[props.id, props.changeFilter])
    const onCompletedClick = useCallback(() => props.changeFilter('completed', props.id),[props.id, props.changeFilter])

    let tasksForTodolist = props.tasks

    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return (
        <div >
            <Grid container direction="row"
                  justify="space-between"
                  alignItems="center" >
                <Grid item>
                    <h3><EditableSpan value={props.title} onChange={changeTodoListTitle}/> </h3>
                </Grid>
                <Grid item>
                    <IconButton onClick={removeTodolist} disabled={props.entityStatus === 'loading'}>
                        <Delete/>
                    </IconButton>
                </Grid>
            </Grid>

            <AddItemForm addItem={addTask} entityStatus={props.entityStatus}/>
            <ul>
                {tasksForTodolist.map(t => (
                    <Task
                        key={t.id}
                        task={t}
                        removeTask={props.removeTask}
                        changeTaskTitle={props.changeTaskTitle}
                        changeStatus={props.changeTaskStatus}
                        todolistId={props.id}/>)
                )}
            </ul>
            <div>
                <Button
                    disabled={props.entityStatus === 'loading'}
                    color={props.filter === 'all' ? 'secondary' : 'primary'} onClick={onAllClick}>All</Button>
                <Button
                    disabled={props.entityStatus === 'loading'}
                    color={props.filter === 'active' ? 'secondary' : 'primary'}
                    onClick={onActiveClick}> Active</Button>
                <Button
                    disabled={props.entityStatus === 'loading'}
                    color={props.filter === 'completed' ? 'secondary' : 'primary'}
                    onClick={onCompletedClick}>Completed</Button>
            </div>
        </div>
    )
})
