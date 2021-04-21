import {TasksStateType, TodoListStateType} from "../../../components/App/AppRedux";
import {tasksReducer} from "../tasks-reducer/task-reducer";
import {todolistsReducer} from "../todolist-reducer/todolist-reducer";
import {addTodolistAC} from '../todolist-reducer/todolist-reducer'

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {
        // 'acaa':[]
    };
    const startTodolistsState: Array<TodoListStateType> = [
        // {id:'aaa',title"new todolist",filter:'all'}
    ];

    const action = addTodolistAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);
});
