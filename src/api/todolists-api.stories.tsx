import React, {useEffect, useState} from 'react'
import {taskAPI, todolistAPI} from "./todolist-api";

export default {
    title: 'API'
}
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
       todolistAPI.getTodos()
            .then((res) => {
                    setState(res.data);
                }
            )
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
       todolistAPI.createTodos('newTodo')
            .then((res) => {
                    setState(res.data.data.item);
                }
            )
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '0010c865-6ee5-4d3d-a37e-8f0282dff708';
       todolistAPI.deleteTodos(todolistId)
            .then( (res) => {
            setState(res.data);
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '0010c865-6ee5-4d3d-a37e-8f0282dff708';
        todolistAPI.updateTodos(todolistId,'react')
            .then((res) => {
                setState(res.data)
            })


    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const GetTaks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '0010c865-6ee5-4d3d-a37e-8f0282dff708';
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
    useEffect(() => {
        const todolistId = '0010c865-6ee5-4d3d-a37e-8f0282dff708';
        taskAPI.createTask(todolistId,'new task')
            .then((res) => {
                    setState(res.data.data);
                }
            )
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '0010c865-6ee5-4d3d-a37e-8f0282dff708';
        const taskId = '0010c865-6ee5-4d3d-a37e-8f0282dff708' //plug course server 500error
        taskAPI.updateTaks(todolistId,taskId,'react')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '0010c865-6ee5-4d3d-a37e-8f0282dff708';
        const taskId = '0010c865-6ee5-4d3d-a37e-8f0282dff708' //plug course server 500error
        taskAPI.deleteTaks(todolistId,taskId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}