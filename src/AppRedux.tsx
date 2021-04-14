import React, {useCallback} from 'react';
import './App.css';
import {TodoList} from "./TodoList";

import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {AddItemForm} from "./addItemForm";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, removeTodolistAC,
} from "./state/reducers/todolist-reducer/todolist-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
} from "./state/reducers/tasks-reducer/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/redux/store";

export type FilteredValuesType = 'all' | 'completed' | 'active'
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodoListStateType = {
    id: string
    title: string
    filter: FilteredValuesType
}
export type TasksStateType = {
    [key: string]: TaskType[]
}

function AppRedux() {

    let todolists = useSelector<AppRootStateType,TodoListStateType[]>(state => state.todolists)
    let tasks = useSelector<AppRootStateType,TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    const removeTask = useCallback((taskId: string, todoListId: string)=> {
        let action = removeTaskAC(taskId, todoListId)
        dispatch(action)
    },[])
    const addTask = useCallback((title: string, todoListId: string) =>  {
        let action = addTaskAC(title, todoListId)
        dispatch(action)
    },[])
    const changeStatus = useCallback((taskId: string, isDoneTask: boolean, todoListId: string)=> {
        let action = changeTaskStatusAC(taskId, isDoneTask, todoListId)
        dispatch(action)
    },[])
    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todoListId: string)=> {
        let action = changeTaskTitleAC(taskId, newTitle, todoListId)
        dispatch(action)
    },[])
    const changeFilter = useCallback((newFilterValue: FilteredValuesType, todoListId: string) =>{
        let action = changeTodolistFilterAC(newFilterValue, todoListId)
        dispatch(action)
    },[])
    const changeTodoListTitle = useCallback((newTitle: string, todoListId: string)=> {
        let action = changeTodolistTitleAC(newTitle, todoListId)
        dispatch(action)
    },[])
    const removeTodolist = useCallback((todoListId: string)=> {
        let action = removeTodolistAC(todoListId)
        dispatch(action)
    },[])
    const addTodoList = useCallback((title: string) =>  {
        let action = addTodolistAC(title)
        dispatch(action)
    },[])

    const todolistComponents = todolists.map(tl => {
        return (
            <Grid item>
                <Paper style={{padding: '10px'}}>
                    <TodoList todoListID={tl.id}
                              title={tl.title}
                              filter={tl.filter}
                              tasks={tasks[tl.id]}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeStatus={changeStatus}
                              removeTodolist={removeTodolist}
                              changeTaskTitle={changeTaskTitle}
                              changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })
    return (
        <div className="App">
            <AppBar position={"static"}>
                    < Toolbar>
                        <IconButton edge={"start"} color={"inherit"} aria-label='menu'>
                            <Menu/>
                        </IconButton>
                        <Typography variant={"h6"}>
                            TodoList
                        </Typography>
                        <Button color={"inherit"}>Login</Button>
                    </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolistComponents}
                </Grid>
            </Container>

        </div>
    );
}

export default AppRedux;
