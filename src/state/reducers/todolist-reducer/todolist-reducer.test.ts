import { v1 } from "uuid"
import {
     addTodolistAC,
   changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolist-reducer";
import {FilteredValuesType, TodoListStateType} from "../../../components/App/AppRedux";


let todoListID_1 :string
let todoListID_2 :string
let startValue:TodoListStateType[]

describe('todolistReducer should', () => {
    beforeEach(()=>{
         todoListID_1 =v1()
         todoListID_2 =v1()
         startValue = [
            {id: todoListID_1, title: 'What to learn', filter: 'all'},
            {id: todoListID_2, title: 'What to learn version', filter: 'all'},
        ]
    })
    test('be removed', () => {
        const action = removeTodolistAC(todoListID_1)
        const endValue = todolistsReducer(startValue,action)

        expect(endValue[0]).toEqual(startValue[1])
    })
    test('be add', () => {
        const title = 'What to steal'
        const action = addTodolistAC(title)
        const endValue = todolistsReducer(startValue,action)

        expect(endValue[0]).toEqual(startValue[0])
        expect(endValue[2].title).toBeDefined()
        expect(endValue[2].title).toEqual(title)
        expect(endValue[2].filter).toEqual('all')
        expect(endValue[1].filter).toEqual('all')

    })
    test('change todolist title', () => {
        const title = 'What to steal'
        const action = changeTodolistTitleAC(title,todoListID_1)
        const endValue = todolistsReducer(startValue,action)

        expect(endValue[0].title).toEqual(title)
        expect(endValue[0].id).toEqual(todoListID_1)
        expect(endValue[0].filter).toEqual('all')
    })
    test('change todolist filter', () => {
        const filter:FilteredValuesType = 'completed'
        const action = changeTodolistFilterAC(filter,todoListID_1)
        const endValue = todolistsReducer(startValue,action)

        expect(endValue[0].filter).toEqual(filter)
        expect(endValue[0].id).toEqual(todoListID_1)
        expect(endValue[0].title).toEqual('What to learn')
    })
})