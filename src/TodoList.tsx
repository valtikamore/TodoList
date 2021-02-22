import React, {ChangeEvent, useState,KeyboardEvent} from "react";
import {filteredTasksType, Task1Type} from "./App";
export type TodoListType = {
    title:string
    tasks:Array<Task1Type>
    removeTask:(taskId:string) => void
    changeFilter:(value:filteredTasksType) => void
    addTask:(title:string) => void
    changeTaskStatus:(id:string,isDone:boolean) => void
    filter:filteredTasksType
}
export function TodoList(props:TodoListType) {
    const [title,setTitle] = useState('')
    const [error,setError] = useState<string|null>(null)
    const addTask = () => {
        let trimmedTask = title.trim()
        if(trimmedTask !== '') {
            props.addTask(title)
            setTitle('')
        }else {
            setError('Title is required')
        }
    }
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {setTitle(e.currentTarget.value) }
    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTask()
        }
    }

    const onAllClickHandler = ()=> props.changeFilter('all')
    const onActiveClickHandler = ()=> props.changeFilter('active')
    const onCompletedClickHandler = ()=> props.changeFilter('completed')

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error?'error':''}/>
                <button onClick={addTask}>+</button>
                {error && <div className='error-message'>{error}</div> }
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const onClickHandller = () => {
                            props.removeTask(t.id)
                        }
                        const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked
                            props.changeTaskStatus(t.id,newIsDoneValue)
                        }
                        return <li key={t.id} className={t.isDone ? 'selected': ''}>
                            <input type="checkbox"
                                   checked={t.isDone}
                                   onChange={onChangeHandler}/>
                            <span>{t.title}</span>
                            <button onClick={onClickHandller}>X
                            </button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={ onAllClickHandler  }>All</button>
                <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={ onActiveClickHandler  }> Active</button>
                <button className={props.filter === 'completed' ? 'active-filter': ''} onClick={ onCompletedClickHandler }>Completed</button>
            </div>
        </div>
    )
}