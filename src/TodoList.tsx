import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {FilteredValuesType, TaskType} from "./App";

export type TodoListType = {
    todolistID:string
    title:string
    filter:FilteredValuesType
    tasks:TaskType[]
    addTask:(title:string,todoListId:string) => void
    removeTask:(taskId:string,todoListId:string) => void
    changeFilter:(newFilterValue:FilteredValuesType,todoListId:string) => void
    changeStatus:(taskId:string,isDoneTask:boolean,todoListId:string) => void
    removeTodolist:(todoListId:string) => void
}

export function TodoList(props:TodoListType) {

    const tasks = props.tasks.map(t => {
        const onRemoveClick = () => props.removeTask(t.id,props.todolistID)
        const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked
            props.changeStatus(t.id ,newIsDoneValue,props.todolistID)
        }
        return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
            <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
            <span>{t.title}</span>
            <button onClick={onRemoveClick}>x</button>
        </li>
    })
    const [title,setTitle] = useState<string>('')
    const [error,setError] = useState<string|null>(null)

    const addTask = () => {
        let trimmedTask = title.trim()
        if(trimmedTask !== '') {
            props.addTask(trimmedTask,props.todolistID)
            setTitle('')
        } else {
            setError('title is requested')
        }

    }
    const onChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {setTitle(event.currentTarget.value)}
    const onAllClick = () => {props.changeFilter('all',props.todolistID)}
    const onActiveClick = () => {props.changeFilter('active',props.todolistID)}
    const onCompletedClick = () => {props.changeFilter('completed',props.todolistID)}
    const removeTodolist = () => props.removeTodolist(props.todolistID)


    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if(e.key === 'Enter') {
            addTask()
        }
    }

    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <button onClick={removeTodolist}>x</button>
            </div>
            <div>
                <input
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressAddTask}
                    className={error ? 'error' : ''}
                />
                <button onClick={addTask}
                        >+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {tasks}
            </ul>
            <div>
                <button className={props.filter==='all' ? 'active' : ''} onClick={onAllClick}>All</button>
                <button className={props.filter==='active' ? 'active' : ''} onClick={onActiveClick}> Active</button>
                <button className={props.filter==='completed' ? 'active' : ''} onClick={onCompletedClick}>Completed</button>
            </div>
        </div>
    )
}