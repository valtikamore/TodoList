import React, {useEffect, useState} from 'react'
import {todolistsAPI} from "./todolist-api";

export default {
    title: 'todoListAPI'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => {
                    setState(res.data);
                }
            )
    }, [])

    return( <div>
        {JSON.stringify(state)}

    </div>)
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.createTodolist('newTodo')
            .then((res) => {
                    setState(res.data.data.item);
                }
            )
    }, [])
    return (<div>
        {JSON.stringify(state)}
    </div>)
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '0010c865-6ee5-4d3d-a37e-8f0282dff708';
        todolistsAPI.deleteTodolist(todolistId)
            .then( (res) => {
            setState(res.data);
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '94a745c9-b713-488a-9e4a-bc94ac9ddd09';
        todolistsAPI.updateTodolist(todolistId,'react')
            .then((res) => {
                setState(res.data)
            })


    }, [])

    return <div> {JSON.stringify(state)}</div>
}

