import {Meta} from "@storybook/react";
import React, {useEffect, useState} from 'react'
import {todolistsAPI} from "../api/todolist";

export default {
    title: 'API/todolist'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodos()
            .then(res => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    useEffect(() => {
        todolistsAPI.getTodos()
            .then(res => {
                setState(res.data)
            })

    }, [])
    const onChangeHandler = (e:any) => {
        setTitle(e.currentTarget.value)
    }
    const onClick = () => {
        todolistsAPI.createTodo(title).then(res => {
            setState(res.data.data.item.title)
        })
    }
    return(
        <div>
            <div> {JSON.stringify(state)}</div>
            <input type="text" value={title} onChange={onChangeHandler}/>
            <button onClick={onClick}> add todolist </button>
        </div>
       )
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    useEffect(() => {
        todolistsAPI.getTodos()
            .then(res => {
                setState(res.data)
            })
    }, [])

    const onClick = () => {
        todolistsAPI.deleteTodo(title).then(res => {
            setState(res.data)
        })
    }
    const onChangeHandler = (e:any) => {
        setTitle(e.currentTarget.value)
    }

    return(
        <div>
            <div> {JSON.stringify(state)}</div>
            <input type="text" value={title} onChange={onChangeHandler}/>
            <button onClick={onClick}> delete todolist </button>
        </div>
    )
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState<string>('')
    const [todoTitle, setTodoTitle] = useState<string>('')

    useEffect(() => {
        todolistsAPI.getTodos()
            .then(res => {
                setState(res.data)
            })
    }, [])

    const onClick = () => {
        todolistsAPI.updateTodo(todoId,todoTitle).then(res => {
            setState(res.data)
        })
    }
    const onChangeHandlerTodoId = (e:any) => {
        setTodoId(e.currentTarget.value)
    }
    const onChangeHandlerTodoTitle = (e:any) => {
        setTodoTitle(e.currentTarget.value)
    }

    return(
        <div>
            <div> {JSON.stringify(state)}</div>
            <input type="text" value={todoId} onChange={onChangeHandlerTodoId} placeholder={'todoID'}/>
            <input type="text" value={todoTitle} onChange={onChangeHandlerTodoTitle} placeholder={'todoTitle'}/>
            <button onClick={onClick}>update todo </button>
        </div>
    )
}


