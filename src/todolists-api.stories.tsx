import React, {useEffect, useState} from 'react'
import {todolistAPI} from "./api/todolist-api";

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
