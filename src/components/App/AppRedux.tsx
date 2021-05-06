import React, {useCallback, useEffect} from 'react';
import '../../App.css';

import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {AddItemForm} from "../AddItemForm/addItemForm";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilteredValuesType, removeTodolistAC, setTodosThunk,
} from "../../state/reducers/todolist-reducer/todolist-reducer";
import {addTaskTC,
    changeTaskTitleAC, removeTaskTC, updateTaskStatusTC,
} from "../../state/reducers/tasks-reducer/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/redux/store";
import {TodoList} from "../Todolist/TodoList";
import {TaskStatuses, TaskType} from "../../api/todolist-api";




export type TodoListStateType = {
    id: string
    title: string
    filter: FilteredValuesType
}
export type TasksStateType = {
    [key: string]: TaskType[]
}

export function AppRedux() {

    useEffect(() => {
        dispatch(setTodosThunk)
    },[])

    let todolists = useSelector<AppRootStateType, TodoListStateType[]>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    const removeTask = useCallback(function (id: string, todolistId: string) {
        dispatch(removeTaskTC(todolistId,id))
    }, []);
    const addTask = useCallback(function (title: string, todolistId: string) {
        dispatch(addTaskTC(todolistId,title));
    }, []);
    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        dispatch(updateTaskStatusTC(todolistId,status,id));
    }, [dispatch]);

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todoListId: string) => {
        let action = changeTaskTitleAC(taskId, newTitle, todoListId)
        dispatch(action)
    }, [dispatch])
    const changeFilter = useCallback((newFilterValue: FilteredValuesType, todoListId: string) => {
        let action = changeTodolistFilterAC(newFilterValue, todoListId)
        dispatch(action)
    }, [dispatch])
    const changeTodoListTitle = useCallback((newTitle: string, todoListId: string) => {
        let action = changeTodolistTitleAC(newTitle, todoListId)
        dispatch(action)
    }, [dispatch])
    const removeTodolist = useCallback((todoListId: string) => {
        let action = removeTodolistAC(todoListId)
        dispatch(action)
    }, [dispatch])
    const addTodoList = useCallback((title: string) => {
        let action = addTodolistAC(title)
        dispatch(action)
    }, [])

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
                <Container >
                    < Toolbar>
                        <IconButton edge={"start"} color={"inherit"} aria-label='menu'>
                            <Menu/>
                        </IconButton>
                        <Typography variant={"h6"}>
                            TodoList
                        </Typography>
                        <Button color={"inherit"}>Login</Button>
                    </Toolbar>
                </Container>
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
