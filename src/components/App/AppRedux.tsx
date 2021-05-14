import React from 'react';
import '../../App.css';

import {
    AppBar,
    Button,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    FilteredValuesType,
} from "../../state/reducers/todolist-reducer/todolist-reducer";
import { useSelector} from "react-redux";
import {AppRootStateType} from "../../state/redux/store";
import { RequestStatusType } from '../../state/reducers/appReducer/appReducer';
import {TodolistsList} from "../TodolistsList/TodolistLists";
import { ErrorSnackbar } from '../ErrorSnackbar/ErrorSnackbar';

export type TodoListStateType = {
    id: string
    title: string
    filter: FilteredValuesType
    entityStatus:RequestStatusType
}

export function AppRedux() {

    const status = useSelector<AppRootStateType,RequestStatusType>(state => state.app.status)

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
            {status === 'loading' &&  <LinearProgress color="secondary" />}
            <Container fixed>
                   <TodolistsList/>
            </Container>
            <ErrorSnackbar/>
        </div>
    );
}

export default AppRedux;
