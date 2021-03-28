import { v1 } from "uuid"
import {FilteredValuesType, TodoListStateType} from "../../App";
import {
    addTodolistTitle,
    changeTodolistFilter,
    todolistReducer
} from "./todolist-reducer";

describe('todolist reducer should be ', () => {
    test('removed', () => {
        let todolistid1 = v1()
        let todolistid2 = v1()
        const startState: TodoListStateType[] = [
            {id: todolistid1, title: 'What to learn', filter: 'all'},
            {id: todolistid2, title: 'What to learn version', filter: 'all'},
        ]
        const ebdState = todolistReducer(startState, {type: 'REMOVE-TODOLIST', id: todolistid1})
        expect(ebdState.length).toEqual(1)
        expect(ebdState[0].id).toEqual(todolistid2)
    })
    test('added', () => {
        let todolistid1 = v1()
        let todolistid2 = v1()
        const startState: TodoListStateType[] = [
            {id: todolistid1, title: 'What to learn', filter: 'all'},
            {id: todolistid2, title: 'What to learn version', filter: 'all'},
        ]
        const newTodolistTitle = 'New todolist'

        const endState = todolistReducer(startState, {type: 'ADD-TODOLIST', title:newTodolistTitle})
        expect(endState.length).toBe(3);
        expect(endState[2].title).toBe(newTodolistTitle);
    })
    test('change title ',()=> {
        let todolistid1 = v1()
        let todolistid2 = v1()
        const newTitle = 'New title'
        const action:addTodolistTitle = {
            type:'CHANGE-TODOLIST-TITLE',
            id:todolistid2,
            title:newTitle
        }
        const startState:TodoListStateType[] = [
        {id: todolistid1, title: 'What to learn', filter: 'all'},
        {id: todolistid2, title: 'What to learn version', filter: 'all'},
        ]
        const endState = todolistReducer(startState,action)
        expect(endState[0].title).toBe('What to learn')
        expect(endState[1].title).toBe(newTitle)
    })
    test('change correct filter ',()=> {
        let todolistid1 = v1()
        let todolistid2 = v1()
        let newFilter:FilteredValuesType = 'completed'

        const action : changeTodolistFilter = {
            type: 'CHANGE-TODOLIST-FILTER',
            id: todolistid2,
            filter: newFilter
        };

        const startState:TodoListStateType[] = [
            {id: todolistid1, title: 'What to learn', filter: 'all'},
            {id: todolistid2, title: 'What to learn version', filter: 'all'},
        ]
        const endState = todolistReducer(startState,action)
        expect(endState[0].filter).toBe('all')
        expect(endState[1].filter).toBe(newFilter)
    })
})