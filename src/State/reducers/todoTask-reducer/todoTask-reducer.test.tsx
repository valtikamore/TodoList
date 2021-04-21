
import {v1} from 'uuid';
import { TasksForTodoListType} from '../../../UseReducer-original/App';
import { AddTodoListAC, RemoveTodolistAC } from '../todolist-reducer/todolist-reducer';
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, todoTaskReducer} from "./todoTask-reducer";


describe('todolist task should be', () => {
    test('remove',()=>{
        const startValue : TasksForTodoListType = {
            'todolistId1': [
                {id: '1', title: 'Html&css', isDone: true},
                {id: '2', title: 'JS', isDone: true},
                {id: '3', title: 'React', isDone: false},
                {id: '4', title: 'Rest API', isDone: false},
            ],
            'todolistId2': [
                {id: '1', title: 'GraphQL', isDone: false},
                {id: '2', title: 'GraphQL', isDone: false},
                {id: '3', title: 'GraphQL', isDone: false},
            ]
        }
        const action = RemoveTaskAC('2','todolistId1')
        const endValue = todoTaskReducer(startValue,action)

        expect(endValue['todolistId1'][1].title).toBe('React')
        expect(endValue['todolistId1'].length).toBeLessThanOrEqual(3)
    })
    test('added',()=> {
        const startValue : TasksForTodoListType = {
            'todolistId1': [
                {id: '1', title: 'Html&css', isDone: true},
                {id: '2', title: 'JS', isDone: true},
                {id: '3', title: 'React', isDone: false},
                {id: '4', title: 'Rest API', isDone: false},
            ],
            'todolistId2': [
                {id: '1', title: 'GraphQL', isDone: false},
                {id: '2', title: 'GraphQL', isDone: false},
                {id: '3', title: 'GraphQL', isDone: false},
            ]
        }
        const title = 'Redux'
        const action = AddTaskAC(title,'todolistId1')
        const endValue = todoTaskReducer(startValue,action)
        expect(endValue['todolistId1'].length).toBe(5)
    })
    test('change title',()=> {
        const startValue : TasksForTodoListType = {
            'todolistId1': [
                {id: '1', title: 'Html&css', isDone: true},
                {id: '2', title: 'JS', isDone: true},
                {id: '3', title: 'React', isDone: false},
                {id: '4', title: 'Rest API', isDone: false},
            ],
            'todolistId2': [
                {id: '1', title: 'GraphQL', isDone: false},
                {id: '2', title: 'GraphQL', isDone: false},
                {id: '3', title: 'GraphQL', isDone: false},
            ]
        }
        const title = 'Semantic'
        const action = ChangeTaskTitleAC('1',title,'todolistId1')
        const endValue = todoTaskReducer(startValue,action)
        expect(endValue['todolistId1'].length).toBe(4)
        expect(endValue['todolistId1'][0].title).toBe('Semantic')
    })
    test('change task status',()=> {
        const startValue : TasksForTodoListType = {
            'todolistId1': [
                {id: '1', title: 'Html&css', isDone: true},
                {id: '2', title: 'JS', isDone: true},
                {id: '3', title: 'React', isDone: false},
                {id: '4', title: 'Rest API', isDone: false},
            ],
            'todolistId2': [
                {id: '1', title: 'GraphQL', isDone: true},
                {id: '2', title: 'MongoDB', isDone: false},
                {id: '3', title: 'NodeJS', isDone: false},
            ]
        }
        const action = ChangeTaskStatusAC('todolistId2','1',false)
        const endValue = todoTaskReducer(startValue,action)
        expect(endValue["todolistId2"][0].isDone).toBeFalsy()
        expect(endValue["todolistId2"].length).toBe(3)
        expect(endValue["todolistId2"][0].title).toBe('GraphQL')

    })
    describe('new array should be added when', ()=>{
        test('new todolist is added', () => {
            const startState: TasksForTodoListType = {
                "todolistId1": [
                    { id: "1", title: "CSS", isDone: false },
                    { id: "2", title: "JS", isDone: true },
                    { id: "3", title: "React", isDone: false }
                ],
                "todolistId2": [
                    { id: "1", title: "bread", isDone: false },
                    { id: "2", title: "milk", isDone: true },
                    { id: "3", title: "tea", isDone: false }
                ]
            };

            const action = AddTodoListAC("new todolist");

            const endState = todoTaskReducer(startState, action)


            const keys = Object.keys(endState);
            const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
            if (!newKey) {
                throw Error("new key should be added")
            }

            expect(keys.length).toBe(3);
            expect(endState[newKey]).toEqual([]);
        });
    })
    test('property with todolistId should be deleted', () => {
        const startState: TasksForTodoListType = {
            "todolistId1": [
                { id: "1", title: "CSS", isDone: false },
                { id: "2", title: "JS", isDone: true },
                { id: "3", title: "React", isDone: false }
            ],
            "todolistId2": [
                { id: "1", title: "bread", isDone: false },
                { id: "2", title: "milk", isDone: true },
                { id: "3", title: "tea", isDone: false }
            ]
        };

        const action = RemoveTodolistAC("todolistId2");

        const endState = todoTaskReducer(startState, action)


        const keys = Object.keys(endState);

        expect(keys.length).toBe(1);
        expect(endState["todolistId2"]).not.toBeDefined();
    });

})