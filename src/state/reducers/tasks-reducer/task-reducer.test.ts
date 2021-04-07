import { TasksStateType } from "../../../AppRedux";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./task-reducer";
import {addTodolistAC, removeTodolistAC} from "../todolist-reducer/todolist-reducer";

let startState: TasksStateType

describe('correct task should be', ()=> {
    beforeEach(()=> {
         startState = {
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
    })
    test('deleted from correct array', () => {
        const action = removeTaskAC("2", "todolistId2");
        const endState = tasksReducer(startState, action)

        expect(endState).toEqual({
            "todolistId1": [
                { id: "1", title: "CSS", isDone: false },
                { id: "2", title: "JS", isDone: true },
                { id: "3", title: "React", isDone: false }
            ],
            "todolistId2": [
                { id: "1", title: "bread", isDone: false },
                { id: "3", title: "tea", isDone: false }
            ]
        });

    });
    test('added to correct array', () => {
        const startState: TasksStateType = {
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
        const action = addTaskAC("juice", "todolistId2");
        const endState = tasksReducer(startState, action)

        expect(endState["todolistId1"].length).toBe(3);
        expect(endState["todolistId2"].length).toBe(4);
        expect(endState["todolistId2"][0].id).toBeDefined();
        expect(endState["todolistId2"][0].title).toBe('juice');
        expect(endState["todolistId2"][0].isDone).toBeFalsy();
    })
    test('status of specified task', () => {
        const startState: TasksStateType = {
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
        const action = changeTaskStatusAC("2", false, "todolistId2");
        const endState = tasksReducer(startState, action)

        expect(endState["todolistId2"]).toBeDefined();
        expect(endState["todolistId2"][1].isDone).toBeFalsy();
        expect(endState["todolistId2"][1].title).toBe('milk');

    });
    test('title of specified task', () => {
        const startState: TasksStateType = {
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
        const action = changeTaskTitleAC("1", 'blabla', "todolistId1");
        const endState = tasksReducer(startState, action)

        expect(endState["todolistId1"]).toBeDefined();
        expect(endState["todolistId1"][0].isDone).toBeFalsy();
        expect(endState["todolistId1"][0].title).toBe('blabla');

    });
})

describe('todolist should be added',() => {
    beforeEach(()=> {
        startState = {
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
    })
    test('New array should be added when new todolist is added', () => {
        const action = addTodolistAC("new todolist");
        const endState = tasksReducer(startState, action)

        const keys = Object.keys(endState);
        const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2");
        if (!newKey) {
            throw Error("new key should be added")
        }

        expect(keys.length).toBe(3);
        expect(endState[newKey]).toEqual([]);
    });
    test('property with todolistId should be deleted', () => {
        const action = removeTodolistAC("todolistId2");

        const endState = tasksReducer(startState, action)


        const keys = Object.keys(endState);

        expect(keys.length).toBe(1);
        expect(endState["todolistId2"]).not.toBeDefined();
    });
})