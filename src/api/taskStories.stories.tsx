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
                    setState(res.data);
                }
            )
    }
    return (<div>
        {JSON.stringify(state)}
        <input type="text" placeholder={'todolist ID'} value={todolist} onChange={(e) => {
            setTodolist(e.currentTarget.value)
        }}/>
        <input type="text" placeholder={'task title'} value={task} onChange={(e) => {
            setTask(e.currentTarget.value)
        }}/>
        <button onClick={createTask}>Create task</button>
    </div>)
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '94a745c9-b713-488a-9e4a-bc94ac9ddd09';
        const taskId = '9f9b41c5-877f-4153-9319-8d932a3ac024' //plug course server 500error
        taskAPI.updateTaks(todolistId, taskId, 'react')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '94a745c9-b713-488a-9e4a-bc94ac9ddd09';
        const taskId = '9f9b41c5-877f-4153-9319-8d932a3ac024' //plug course server 500error
        taskAPI.deleteTaks(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}