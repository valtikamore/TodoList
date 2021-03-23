import './App.css';
import {TodoList} from "./TodoList";
import {useState} from "react";
import {v1} from 'uuid';
import {AddItemForm} from "./addItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";


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


function App() {
    let todoListId1 = v1()
    let todoListId2 = v1()
    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to learn', filter: 'all'}
    ])
    const [tasks, setTasks] = useState<TasksForTodoListType>({
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

    function changeFilter(value: filteredTasksType, todoListId: string) {
        let todolist = todoLists.find(tl => tl.id === todoListId)
        if (todolist) {
            todolist.filter = value
            setTodoLists([...todoLists])
        }
    }
    function removeTask(taskId: string, todoListId: string) {
        let todolistTasks = tasks[todoListId]
        tasks[todoListId] = todolistTasks.filter(t => t.id !== taskId)
        setTasks({...tasks})
    }
    function addTask(title: string, todoListId: string) {
        let newTask = {id: v1(), title: title, isDone: false,}
        let todolistTasks = tasks[todoListId]
        tasks[todoListId] = [newTask, ...todolistTasks]
        setTasks({...tasks})
    }
    function addTodoList(title: string) {
        let newTodoListId = v1()
        let newTodolist: TodoListType = {id: newTodoListId, title: title, filter: 'all'}
        setTodoLists([newTodolist, ...todoLists])
        setTasks({
            ...tasks,
            [newTodoListId]: []
        })

    }
    function changeTaskStatus(id: string, isDone: boolean, todoListId: string) {
        let todolistTasks = tasks[todoListId]
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }
    function changeTaskTitle(id: string, newTitle: string, todoListId: string) {
        let todolistTasks = tasks[todoListId]
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.title = newTitle
            setTasks({...tasks})
        }
    }
    function changeTodoListTitle(Id: string, title: string) {
        const todolist = todoLists.find(tl => tl.id === Id)
        if (todolist) {
            todolist.title = title
            setTodoLists([...todoLists])
        }
    }
    function removeTodoList(todoListId: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
        setTasks({...tasks})
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
                    <Toolbar >
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

export default App;
