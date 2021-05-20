import {addTaskAC, setTasksAC, tasksReducer, TasksStateType} from "./tasks-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolistAPI";


let startState:TasksStateType = {}

beforeEach(() => {
    startState = {
        'todolistId1' : [
            {
                id: '1',
                title: 'ddddd',
                status:TaskStatuses.New,
                todoListId:'1',
                description:'',
                startDate:'',
                deadline:'',
                addedDate:'',
                order:0,
                priority:TaskPriorities.Low
            }
        ],
        'todolistId2' : [
            {
                id: '1',
                title: 'ddddd',
                status:TaskStatuses.New,
                todoListId:'1',
                description:'',
                startDate:'',
                deadline:'',
                addedDate:'',
                order:0,
                priority:TaskPriorities.Low
            }
        ]
    }
})

test('tasks should be seted for todolist',()=>{
    const action = setTasksAC('todolistId1',startState['todolistId1'])

    const endState = tasksReducer({
        'todolistId1': [],
        'todolistId2': []
    },action)

    expect(endState['todolistId1'].length).toBe(1)
})
test('tasks should be added to correct array',()=> {
    const action = addTaskAC({
        todoListId:'todolistid2',
        title:'juce',
        status:TaskStatuses.New,
        addedDate:'',
        deadline:'',
        description:'',
        order:0,
        priority:0,
        startDate:'',
        id:'id is exists'
    })

    const endState = tasksReducer(startState,action)

    expect(endState['todolistId1'].length).toBe(1)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'][0].id).toBe('id is exists')
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)

})