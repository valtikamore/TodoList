import { v1 } from "uuid"
import {FilteredValuesType, TodoListStateType} from "../../App";
import {
    AddTodolistAC,
    addTodolistTitle, ChangeFilterTodolistAC, ChangeTodolistAC,
    changeTodolistFilter, RemoveTodolistAC,
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
        const ebdState = todolistReducer(startState, RemoveTodolistAC(todolistid1))
        expect(ebdState.length).toEqual(1)
        expect(ebdState[0].id).toEqual(todolistid2)
    })
    test('added todo ', () => {
        let todolistid1 = v1()
        let todolistid2 = v1()
        const startState: TodoListStateType[] = [
            {id: todolistid1, title: 'What to learn', filter: 'all'},
            {id: todolistid2, title: 'What to learn version', filter: 'all'},
        ]
        const newTodolistTitle = 'New todolist'

        const endState = todolistReducer(startState,AddTodolistAC(newTodolistTitle) )
        expect(endState.length).toBe(3);
        expect(endState[2].title).toBe(newTodolistTitle);
    })
    test('change title ',()=> {
        let todolistid1 = v1()
        let todolistid2 = v1()
        const newTitle = 'New title'

        const startState:TodoListStateType[] = [
        {id: todolistid1, title: 'What to learn', filter: 'all'},
        {id: todolistid2, title: 'What to learn version', filter: 'all'},
        ]
        const endState = todolistReducer(startState,ChangeTodolistAC(newTitle))
        expect(endState[0].title).toBe('What to learn')
        expect(endState[1].title).toBe(newTitle)
    })
    test('change correct filter ',()=> {
        let todolistid1 = v1()
        let todolistid2 = v1()
        let newFilter:FilteredValuesType = 'completed'


        const startState:TodoListStateType[] = [
            {id: todolistid1, title: 'What to learn', filter: 'all'},
            {id: todolistid2, title: 'What to learn version', filter: 'all'},
        ]
        const endState = todolistReducer(startState,ChangeFilterTodolistAC(todolistid2,newFilter))
        expect(endState[0].filter).toBe('all')
        expect(endState[1].filter).toBe(newFilter)
    })
})