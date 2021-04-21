import {Provider} from "react-redux";
import React from 'react'
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../../state/reducers/tasks-reducer/task-reducer";
import {todolistsReducer} from "../../state/reducers/todolist-reducer/todolist-reducer";
import { v1 } from "uuid";
import {AppRootStateType} from "../../state/redux/store";

const rootReducer = combineReducers({
    tasks:tasksReducer,
    todolist:todolistsReducer
})
const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ],
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
}
export const storyBookStore = createStore(rootReducer,initialGlobalState as AppRootStateType)

export const ReduxStoreProviderDecorator = (storyFn:() => React.ReactNode) => {
    return (<Provider store={storyBookStore}>
        {storyFn()}
    </Provider>
    )}