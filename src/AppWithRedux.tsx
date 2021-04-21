import './App.css';
import {TodoList} from "./components/todolist/TodoList";
import {AddItemForm} from "./addItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC, ChangeTodoListTitleAC, RemoveTodolistAC,
} from "./State/reducers/todolist-reducer/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./State/redux/store";

export type filteredTasksType = 'all' | 'active' | 'completed'
export  type TodoListType = {
    id: string
    title: string
    filter: filteredTasksType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksForTodoListType = {
    [key: string]: TaskType[]
}


function AppWithRedux() {
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootState, TasksForTodoListType>((state) => state.tasks)
    const todolists = useSelector<AppRootState, TodoListType[]>((state) => state.todolist)

    function addTodoList(title: string) {
        let action = AddTodoListAC(title)
        dispatch(action)
    }

    function changeFilter(value: filteredTasksType, todoListId: string) {
        dispatch(ChangeTodoListFilterAC(todoListId, value))
    }

    function changeTodoListTitle(todolistId: string, title: string) {
        dispatch(ChangeTodoListTitleAC(todolistId, title))
    }

    function removeTodoList(todoListId: string) {
        let action = RemoveTodolistAC(todoListId)
        dispatch(action)
    }

    const todolistMap = todolists.map(tl => {
        return (
            <Grid item key={tl.id}
                  direction="column"
                  justify="space-between"
                  alignItems="center">
                <Paper elevation={3} style={{padding: '20px'}}>
                    <TodoList
                        id={tl.id}
                        title={tl.title}
                        removeTodoList={removeTodoList}
                        changeFilter={changeFilter}
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

export default AppWithRedux