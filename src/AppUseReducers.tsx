import './App.css';
import {TodoList} from "./TodoList";
import {useReducer} from "react";
import {v1} from 'uuid';
import {AddItemForm} from "./addItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC, ChangeTodoListTitleAC, RemoveTodolistAC,
    todoListsReducer
} from "./State/reducers/todolist-reducer/todolist-reducer";
import {
    AddTaskAC, ChangeTaskStatusAC,
    ChangeTaskTitleAC,
    RemoveTaskAC,
    todoTaskReducer
} from "./State/reducers/todoTask-reducer/todoTask-reducer";

export type filteredTasksType = 'all' | 'active' | 'completed'
export  type TodoListType = {
    id: string
    title: string
    filter: filteredTasksType
}
export type Task1Type = {
    id: string
    title: string
    isDone: boolean
}
export type TasksForTodoListType = {
    [key: string]: Task1Type[]
}


function AppUseReducers() {
    let todoListId1 = v1()
    let todoListId2 = v1()
    const [todoLists, dispatchToTodolistsReducer] = useReducer(todoListsReducer, [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to learn', filter: 'all'}
    ])
    const [tasks, dispatchToTasksReducer] = useReducer(todoTaskReducer, {
        [todoListId1]: [
            {id: v1(), title: 'Html&css', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: 'GraphQL', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]

    })

//useReducer second param(func) => action(result of calling AC)
    function removeTask(taskId: string, todoListId: string) {
        dispatchToTasksReducer(RemoveTaskAC(taskId, todoListId))
    }

    function addTask(title: string, todoListId: string) {
        dispatchToTasksReducer(AddTaskAC(title, todoListId))
    }

    function changeTaskStatus(taskId: string, isDoneTask: boolean, todoListId: string) {
        dispatchToTasksReducer(ChangeTaskStatusAC(todoListId, taskId, isDoneTask))
    }

    function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
        dispatchToTasksReducer(ChangeTaskTitleAC(taskId, newTitle, todoListId))
    }

    function addTodoList(title: string) {
        dispatchToTodolistsReducer(AddTodoListAC(title))
        dispatchToTasksReducer(AddTodoListAC(title))
    }

    function changeFilter(value: filteredTasksType, todoListId: string) {
        dispatchToTodolistsReducer(ChangeTodoListFilterAC(todoListId, value))
    }

    function changeTodoListTitle(todolistId: string, title: string) {
        dispatchToTodolistsReducer(ChangeTodoListTitleAC(todolistId, title))
    }

    function removeTodoList(todoListId: string) {
        let action = RemoveTodolistAC(todoListId)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }

    const todolistMap = todoLists.map(tl => {
        let allTodoListTasks = tasks[tl.id]
        let tasksForTodoList = allTodoListTasks
        if (tl.filter === 'active') {
            tasksForTodoList = allTodoListTasks.filter(t => t.isDone)
        }
        if (tl.filter === 'completed') {
            tasksForTodoList = allTodoListTasks.filter(t => !t.isDone)
        }
        return (
            <Grid item key={tl.id}
                  direction="column"
                  justify="space-between"
                  alignItems="center">
                <Paper elevation={3} style={{padding: '20px'}}>
                    <TodoList
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodoList}
                        removeTodoList={removeTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                        filter={tl.filter}
                    />
                </Paper>
            </Grid>


        )
    })
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolist
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px 0 20px 0'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}
                >
                    {todolistMap}
                </Grid>
            </Container>
        </div>
    );
}

export default AppUseReducers