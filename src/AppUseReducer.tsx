import React, {useReducer, useState} from 'react';
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

function AppUseReducer() {
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, dispatchToTodolists] = useReducer(todolistsReducer,[
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to learn version', filter: 'all'},
    ])

    const [tasks, dispatchToTasks] = useReducer(tasksReducer,{
        [todoListID_1]: [
            {id: v1(), title: 'Html&css', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: 'Algorithms & data structure', isDone: true},
            {id: v1(), title: 'Blockchain', isDone: true},
            {id: v1(), title: 'Vue', isDone: false},
            {id: v1(), title: 'MongoDB', isDone: false},
            {id: v1(), title: 'Apollo', isDone: false},
        ],
    })

    function removeTask(taskId: string, todoListId: string) {
        let action =  removeTaskAC(taskId,todoListId)
        dispatchToTasks(action)
    }

    function addTask(title: string, todoListId: string) {
        let action = addTaskAC(title,todoListId)
        dispatchToTasks(action)
    }

    function changeStatus(taskId: string, isDoneTask: boolean, todoListId: string) {
        let action = changeTaskStatusAC(taskId,isDoneTask,todoListId)
        dispatchToTasks(action)
    }

    function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
        let action = changeTaskTitleAC(taskId,newTitle,todoListId)
        dispatchToTasks(action)
    }

    function changeFilter(newFilterValue: FilteredValuesType, todoListId: string) {
       let action = changeTodolistFilterAC(newFilterValue,todoListId)
        dispatchToTodolists(action)
    }

    function changeTodoListTitle(newTitle: string, todoListId: string) {
        let action = changeTodolistTitleAC(newTitle,todoListId)
        dispatchToTodolists(action)
    }

    function removeTodolist(todoListId: string) {
        let action = removeTodolistAC(todoListId)
        dispatchToTodolists(action)
    }

    function addTodoList(title: string) {
        let action = addTodolistAC(title)
        dispatchToTasks(action)
        dispatchToTodolists(action)
    }

    const todolistComponents = todoLists.map(tl => {
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
                <Toolbar>
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

export default AppUseReducer;
