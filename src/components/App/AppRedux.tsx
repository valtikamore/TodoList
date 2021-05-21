import React, {useEffect} from 'react';
import '../../App.css';

import {
    AppBar,
    Button, CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
     FilterValuesType,
} from "../../state/reducers/todolist-reducer/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/redux/store";
import {initializeAppTC, RequestStatusType} from '../../state/reducers/appReducer/appReducer';
import {TodolistsList} from "../TodolistsList/TodolistLists";
import { ErrorSnackbar } from '../ErrorSnackbar/ErrorSnackbar';
import {logoutTC} from "../login/authReducer";
import {Redirect, Route, Switch} from 'react-router-dom';
import {Login} from "../login/login";

export type TodoListStateType = {
    id: string
    title: string
    filter: FilterValuesType
    entityStatus:RequestStatusType
}

export function AppRedux() {

    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
    const login = useSelector<AppRootStateType,boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    useEffect(() => {
        dispatch(initializeAppTC())
    },[])

    if(!isInitialized) {
        return  <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>

    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position={"static"}>
                <Container >
                    < Toolbar>
                        <IconButton edge={"start"} color={"inherit"} aria-label='menu'>
                            <Menu/>
                        </IconButton>
                        <Typography variant={"h6"}>
                            TodoList
                        </Typography>
                        {login && <Button color="inherit" onClick={logoutHandler}>Log OUT</Button>}
                    </Toolbar>
                </Container>
                { status === 'loading' &&  <LinearProgress /> }
            </AppBar>

            <Container fixed>
                <Switch>
                    <Route exact path={'/'} render={() => <TodolistsList/>}/>
                    <Route  path={'/login'} render={() =>  <Login/>}/>
                    <Route  path={'/404'} render={() =>  <h1 style={{textAlign:'center',fontSize:'52px'}}>404.  Page not found</h1>}/>
                    <Redirect from={'*'} to={'/404'}/>
                </Switch>
            </Container>

        </div>
    );
}

export default AppRedux;
