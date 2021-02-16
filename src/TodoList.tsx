import React, {ChangeEvent, useState,KeyboardEvent} from "react";
import {filteredTasksType, Task1Type} from "./App";
export type TodoListType = {
    title:string
    tasks:Array<Task1Type>
    removeTask:(taskId:string) => void
    changeFilter:(value:filteredTasksType) => void
    addTask:(title:string) => void
}
export function TodoList(props:TodoListType) {
    const [title,setTitle] = useState('')
    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {setTitle(e.currentTarget.value) }
    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => {if (e.key === 'Enter'){addTask()}}
    const onAllClickHandler = ()=> props.changeFilter('all')
    const onActiveClickHandler = ()=> props.changeFilter('active')
    const onCompletedClickHandler = ()=> props.changeFilter('completed')

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const onClickHandller = () => {
                            props.removeTask(t.id)
                        }
                        return <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={onClickHandller}>X
                            </button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={ onAllClickHandler  }>All</button>
                <button onClick={ onActiveClickHandler  }> Active</button>
                <button onClick={ onCompletedClickHandler }>Completed</button>
            </div>
        </div>
    )
}