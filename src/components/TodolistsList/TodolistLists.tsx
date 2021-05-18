import React, {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/redux/store";
import {
    addTaskTC,
    removeTaskTC,
    TasksStateType,
    updateTaskStatusTC
} from "../../state/reducers/tasks-reducer/task-reducer";
import {TodoListStateType} from "../App/AppRedux";
import {
    addTodolistTC,
    changeTodolistFilterAC, changeTodolistTitleTC,
    fetchTodolistsTC,
    FilteredValuesType, removeTodolistTC
} from "../../state/reducers/todolist-reducer/todolist-reducer";
import {TaskStatuses} from "../../api/todolist-api";
import {Grid, Paper} from "@material-ui/core";

import {Todolist} from "../Todolist/Todolist";
import {AddItemForm} from "../AddItemForm/additemForm";


export const TodolistsList: React.FC = () => {
    let todolists = useSelector<AppRootStateType, TodoListStateType[]>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()
    useEffect(() => {
        const thunk = fetchTodolistsTC()
        dispatch(thunk)
    }, [])

    const removeTask = useCallback(function (id: string, todolistId: string) {
        dispatch(removeTaskTC(todolistId,id))
    }, []);
    const addTask = useCallback(function (title: string, todolistId: string) {
        dispatch(addTaskTC(todolistId,title));
    }, []);

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        dispatch(updateTaskStatusTC(todolistId, {status},id));
    }, []);

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todoListId: string) => {
        let action = updateTaskStatusTC(taskId, {title : newTitle}, todoListId)
        dispatch(action)
    }, [])

    const changeFilter = useCallback((newFilterValue: FilteredValuesType, todoListId: string) => {
        let action = changeTodolistFilterAC(newFilterValue, todoListId)
        dispatch(action)
    }, [])

    const changeTodolistTitle = useCallback((newTitle: string, todoListId: string) => {
        let action = changeTodolistTitleTC(newTitle, todoListId)
        dispatch(action)
    }, [dispatch])
    const removeTodolist = useCallback((todoListId: string) => {
        let action = removeTodolistTC(todoListId)
        dispatch(action)
    }, [dispatch])
    const addTodoList = useCallback((title: string) => {
        let action = addTodolistTC(title)
        dispatch(action)
    }, [dispatch])
    return (
        <>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm addItem={addTodoList}/>
            </Grid>
            <Grid container spacing={3}>
                {
                    todolists.map(tl => {
                        let allTodolistTasks = tasks[tl.id]

                        return <Grid item key={tl.id}>
                            <Paper style={{padding: '10px'}}>
                                <Todolist
                                    id={tl.id}
                                    title={tl.title}
                                    filter={tl.filter}
                                    entityStatus={tl.entityStatus}
                                    tasks={allTodolistTasks}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })
                }
            </Grid>
        </>
    )
}