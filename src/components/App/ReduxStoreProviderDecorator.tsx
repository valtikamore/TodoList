import {Provider} from "react-redux";
import React from 'react'
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../../state/reducers/tasks-reducer/task-reducer";
import {todolistsReducer} from "../../state/reducers/todolist-reducer/todolist-reducer";

import {AppRootStateType} from "../../state/redux/store";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {

};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)
