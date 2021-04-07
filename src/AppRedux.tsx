import React, {useReducer} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TodoList} from "./TodoList";

import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {AddItemForm} from "./addItemForm";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, removeTodolistAC,
    todolistsReducer
} from "./state/reducers/todolist-reducer/todolist-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
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

    function removeTask(taskId: string, todoListId: string) {
        let action = removeTaskAC(taskId, todoListId)
        dispatch(action)
    }

    function addTask(title: string, todoListId: string) {
        let action = addTaskAC(title, todoListId)
        dispatch(action)
    }

    function changeStatus(taskId: string, isDoneTask: boolean, todoListId: string) {
        let action = changeTaskStatusAC(taskId, isDoneTask, todoListId)
        dispatch(action)
    }

    function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
        let action = changeTaskTitleAC(taskId, newTitle, todoListId)
        dispatch(action)
    }

    function changeFilter(newFilterValue: FilteredValuesType, todoListId: string) {
        let action = changeTodolistFilterAC(newFilterValue, todoListId)
        dispatch(action)
    }

    function changeTodoListTitle(newTitle: string, todoListId: string) {
        let action = changeTodolistTitleAC(newTitle, todoListId)
        dispatch(action)
    }

    function removeTodolist(todoListId: string) {
        let action = removeTodolistAC(todoListId)
        dispatch(action)
    }

    function addTodoList(title: string) {
        let action = addTodolistAC(title)
        dispatch(action)
    }

    const todolistComponents = todolists.map(tl => {
        let tasksForTodoList = tasks[tl.id]
        if (tl.filter === 'active') {
            tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
        }
        if (tl.filter === 'completed') {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
        }
        return (
            <Grid item>
                <Paper style={{padding: '10px'}}>
                    <TodoList todolistID={tl.id}
                              title={tl.title}
                              filter={tl.filter}
                              tasks={tasksForTodoList}
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
