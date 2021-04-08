import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../reducers/tasks-reducer/task-reducer";
import {todolistsReducer} from "../reducers/todolist-reducer/todolist-reducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks:tasksReducer,
    todolists:todolistsReducer
})
// непосредственно создаём store
// export const store = createStore(rootReducer)

export const  store = createStore(
    rootReducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
)

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент





