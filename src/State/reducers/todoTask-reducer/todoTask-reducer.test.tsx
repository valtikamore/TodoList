
import {v1} from 'uuid';
import { TasksForTodoListType} from '../../../App';
import {RemoveTaskAC} from "./todoTask-reducer";


describe('todolist task should be', () => {
    test('remove',()=>{

        const startValue : TasksForTodoListType = {
            'todolistId1': [
                {id: v1(), title: 'Html&css', isDone: true},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'React', isDone: false},
                {id: v1(), title: 'Rest API', isDone: false},
            ],
            'todolistId2': [
                {id: v1(), title: 'GraphQL', isDone: false},
                {id: v1(), title: 'GraphQL', isDone: false},
                {id: v1(), title: 'GraphQL', isDone: false},
            ]
        }
        const action = RemoveTaskAC('2','todolistId1')
        const endValue = RemoveTaskAC(startValue,action)

        expect(endValue[2].title).toBe('React')

    })
})