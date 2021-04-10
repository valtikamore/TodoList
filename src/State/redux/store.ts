import {combineReducers, createStore} from "redux";
import {todoTaskReducer} from "../reducers/todoTask-reducer/todoTask-reducer";
import {todoListsReducer} from "../reducers/todolist-reducer/todolist-reducer";


export const rootReducer = combineReducers({
    todolist:todoListsReducer,
    tasks:todoTaskReducer
})

export let store = createStore(
    rootReducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
)

export type AppRootState = ReturnType<typeof rootReducer>