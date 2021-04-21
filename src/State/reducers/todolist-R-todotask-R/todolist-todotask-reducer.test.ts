import {TasksForTodoListType, TodoListType} from "../../../UseReducer-original/App";
import {AddTodoListAC, todoListsReducer} from "../todolist-reducer/todolist-reducer";
import {todoTaskReducer} from "../todoTask-reducer/todoTask-reducer";


test('ids should be equals', () => {
    const startTasksState: TasksForTodoListType = {};
    const startTodolistsState: Array<TodoListType> = [];

    const action = AddTodoListAC("new todolist");

    const endTasksState = todoTaskReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);
});
