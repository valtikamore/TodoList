import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {FilteredValuesType, TaskType} from "./App";

export type TodoListType = {
    title:string
    tasks:Array<TaskType>
    removeTask:(taskId:string) => void
    changeFilter:(value:FilteredValuesType) => void
    addTask:(title:string) => void
}

export function TodoList(props:TodoListType) {

    const [title,setTitle] = useState<string>('ss')

    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }

    const onChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {setTitle(event.currentTarget.value)}
    const onAllClick = () => {props.changeFilter('all')}
    const onActiveClick = () => {props.changeFilter('active')}
    const onCompletedClick = () => {props.changeFilter('completed')}


    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
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
                />
                <button onClick={addTask}
                        >+</button>
            </div>
            <ul>
                {  props.tasks.map(t => {
                    const onRemoveClick = () => props.removeTask(t.id)
                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onRemoveClick}>XXX</button>
                    </li>
                })
                }
            </ul>
            <div>
                <button onClick={onAllClick}>All</button>
                <button onClick={onActiveClick}> Active</button>
                <button onClick={onCompletedClick}>Completed</button>
            </div>
        </div>
    )
}