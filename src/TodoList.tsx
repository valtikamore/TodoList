import React, {ChangeEvent, useState,KeyboardEvent} from "react";
import {filteredTasksType, Task1Type} from "./App";
export type TodoListTypeProps = {
    id:string
    title:string
    tasks:Array<Task1Type>
    removeTask:(taskId:string,todoListId:string) => void
    removeTodoList:(todoListId:string)=>void
    changeFilter:(value:filteredTasksType,todoListId:string) => void
    addTask:(title:string,todoListId:string) => void
    changeTaskStatus:(id:string,isDone:boolean,todoListId:string) => void
    filter:filteredTasksType
}
export function TodoList(props:TodoListTypeProps) {
    const [title,setTitle] = useState('')
    const [error,setError] = useState<string|null>(null)
    const addTask = () => {
        let trimmedTask = title.trim()
        if(trimmedTask !== '') {
            props.addTask(title,props.id)
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
    const removeTodolist = () => {
        props.removeTodoList(props.id)
    }

    const onAllClickHandler = ()=> props.changeFilter('all' , props.id)
    const onActiveClickHandler = ()=> props.changeFilter('active', props.id)
    const onCompletedClickHandler = ()=> props.changeFilter('completed', props.id)

    return (
        <div>
            <h3>{props.title}</h3>
            <button onClick={removeTodolist}>x</button>
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
                            props.removeTask(t.id,props.id)
                        }
                        const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked
                            props.changeTaskStatus(t.id,newIsDoneValue,props.id)
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