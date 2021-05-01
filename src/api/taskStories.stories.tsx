import React, {useEffect, useState} from "react";
import {taskAPI} from "./todolist-api";

export default {
    title: 'taskApi'
}
export const GetTaks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '94a745c9-b713-488a-9e4a-bc94ac9ddd09';
        taskAPI.getTasks(todolistId)
            .then((res) => {
                    setState(res.data);
                }
            )
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [task, setTask] = useState<string>('')
    const [todolist, setTodolist] = useState<string>('')
    const createTask = () => {
        taskAPI.createTask(todolist, task)
            .then((res) => {
                    setState(res.data.data);
                }
            )
    }
    return (<div>
        {JSON.stringify(state)}
        <div> <input type="text" placeholder={'todolist ID'} value={todolist} onChange={(e) => {
            setTodolist(e.currentTarget.value)
        }}/>
            <input type="text" placeholder={'task title'} value={task} onChange={(e) => {
                setTask(e.currentTarget.value)
            }}/>
            <button onClick={createTask}>Create task</button>
        </div>
    </div>)
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [task, setTask] = useState<string>('')
    const [todolist, setTodolist] = useState<string>('')
    const [taskTitle, setTaskTitle] = useState<string>('')
   const updateTask = () => {
       taskAPI.updateTaks(todolist, task, taskTitle)
           .then((res) => {
               setState(res.data)
           })
   }
    useEffect(() => {
        const todolistId = '94a745c9-b713-488a-9e4a-bc94ac9ddd09';
        taskAPI.getTasks(todolistId)
            .then((res) => {
                    setState(res.data);
                }
            )
    }, [])


    return (<div> {JSON.stringify(state)}
        <div> <input type="text" placeholder={'todolist ID'} value={todolist} onChange={(e) => {
            setTodolist(e.currentTarget.value)
        }}/>
            <input type="text" placeholder={'task Id'} value={task} onChange={(e) => {
                setTask(e.currentTarget.value)
            }}/>
            <input type="text" placeholder={'task title'} value={taskTitle} onChange={(e) => {
                setTaskTitle(e.currentTarget.value)
            }}/>
            <button onClick={updateTask}>Update task</button>
        </div>
    </div>)
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [task, setTask] = useState<string>('')
    const [todolist, setTodolist] = useState<string>('')
    useEffect(() => {
        const todolistId = '94a745c9-b713-488a-9e4a-bc94ac9ddd09';
        taskAPI.getTasks(todolistId)
            .then((res) => {
                    setState(res.data);
                }
            )
    }, [])
    const deleteTask = () => {
        taskAPI.deleteTaks(todolist,task)
            .then(response => {
                setState(response.data)
            })
    }

    return (<div> {JSON.stringify(state)}
        <div>
            <input type="text" placeholder={'todolist ID'} value={todolist} onChange={(e) => {
            setTodolist(e.currentTarget.value)
        }}/>
            <input type="text" placeholder={'task Id'} value={task} onChange={(e) => {
                setTask(e.currentTarget.value)
            }}/>
            <button onClick={deleteTask}>Update task</button>
        </div>
    </div>)
}