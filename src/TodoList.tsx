import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {filteredTasksType, Task1Type} from "./App";
import {AddItemForm} from "./addItemForm";
import {EditableSpan} from "./EditableSpan";

export type TodoListTypeProps = {
    id: string
    title: string
    tasks: Array<Task1Type>
    removeTask: (taskId: string, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeFilter: (value: filteredTasksType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle:(id: string,newTitle: string, todoListId: string) => void
    changeTodoListTitle:( Id: string,newTitle: string) => void
    filter: filteredTasksType
}

export function TodoList(props: TodoListTypeProps) {

    const addTask = (title: string) => {
       props.addTask(title,props.id)
    }
    const removeTodolist = () => {
        props.removeTodoList(props.id)
    }
    const changeTodoListTitle = (title:string) => {
        props.changeTodoListTitle(props.id,title)
    }
    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)
    const tasksMap = props.tasks.map(t => {
        const onClickHandller = () => {
            props.removeTask(t.id, props.id)
        }
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked
            props.changeTaskStatus(t.id, newIsDoneValue, props.id)
        }
        const onChangeTaskTitle = (title:string) => {
            props.changeTaskTitle(t.id,title,props.id)
        }
        return <li key={t.id} className={t.isDone ? 'selected' : ''}>
            <input type="checkbox"
                   checked={t.isDone}
                   onChange={onChangeHandler}/>
            <EditableSpan value={t.title} onChange={onChangeTaskTitle}/>
            <button onClick={onClickHandller}>X
            </button>
        </li>
    })

    return (
        <div>
            <EditableSpan value={props.title} onChange={changeTodoListTitle}/>
            <button onClick={removeTodolist}>x</button>
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasksMap}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}> Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}