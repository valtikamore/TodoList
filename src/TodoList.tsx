import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {FilteredValuesType, TaskType} from "./App";

export type TodoListType = {
    title:string
    tasks:Array<TaskType>
    removeTask:(taskId:string) => void
    changeFilter:(value:FilteredValuesType) => void
    addTask:(title:string) => void
    changeStatus:(taskId:string,isDoneTask:boolean) => void
    filter:FilteredValuesType
}

export function TodoList(props:TodoListType) {

    const [title,setTitle] = useState<string>('')
    const [error,setError] = useState<string|null>(null)

    const addTask = () => {
        let trimmedTask = title.trim()
        if(trimmedTask !== '') {
            props.addTask(trimmedTask)
            setTitle('')
        } else {
            setError('title is requested')
        }

    }

    const onChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {setTitle(event.currentTarget.value)}
    const onAllClick = () => {props.changeFilter('all')}
    const onActiveClick = () => {props.changeFilter('active')}
    const onCompletedClick = () => {props.changeFilter('completed')}



    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if(e.key === 'Enter') {
            addTask()
        }
    }

    return (
        <div>
            <h3>{props.title}</h3>
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
                {  props.tasks.map(t => {
                    const onRemoveClick = () => props.removeTask(t.id)
                    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeStatus(t.id , newIsDoneValue)
                    }
                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                        <span>{t.title}</span>
                        <button onClick={onRemoveClick}>XXX</button>
                    </li>
                })
                }
            </ul>
            <div>
                <button className={props.filter==='all' ? 'active' : ''} onClick={onAllClick}>All</button>
                <button className={props.filter==='active' ? 'active' : ''} onClick={onActiveClick}> Active</button>
                <button className={props.filter==='completed' ? 'active' : ''} onClick={onCompletedClick}>Completed</button>
            </div>
        </div>
    )
}