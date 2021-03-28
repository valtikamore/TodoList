import React, { ChangeEvent} from "react";
import AddItemForm from "./addItemForm";
import {FilteredValuesType, TaskType} from "./App";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import { Delete} from "@material-ui/icons";

export type TodoListType = {
    todolistID: string
    title: string
    filter: FilteredValuesType
    tasks: TaskType[]
    addTask: (title: string, todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (newFilterValue: FilteredValuesType, todoListId: string) => void
    changeStatus: (taskId: string, isDoneTask: boolean, todoListId: string) => void
    removeTodolist: (todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    changeTodoListTitle: (newTitle: string, todoListId: string) => void
}


export function TodoList(props: TodoListType) {

    const addTask = (title: string) => {
        props.addTask(title, props.todolistID)
    }
    const onAllClick = () => {
        props.changeFilter('all', props.todolistID)
    }
    const onActiveClick = () => {
        props.changeFilter('active', props.todolistID)
    }
    const onCompletedClick = () => {
        props.changeFilter('completed', props.todolistID)
    }
    const removeTodolist = () => props.removeTodolist(props.todolistID)
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.todolistID)
    }

    const tasks = props.tasks.map(t => {
        const onRemoveClick = () => props.removeTask(t.id, props.todolistID)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked
            props.changeStatus(t.id, newIsDoneValue, props.todolistID)
        }
        const changeTaskTitle = (newTitle: string) => {
            props.changeTaskTitle(t.id, newTitle, props.todolistID)
        }
        return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
            <Checkbox
                color={"primary"}
                checked={t.isDone}
                onChange={onChangeHandler}
            />
            <EditableSpan title={t.title} changeTaskTitle={changeTaskTitle}/>
            <button onClick={onRemoveClick}>x</button>
        </li>
    })
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTaskTitle={changeTodoListTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask}/>
            <ul>
                {tasks}
            </ul>
            <div>
                <Button
                    color={props.filter === 'all' ? 'secondary' : 'primary'} onClick={onAllClick}>All</Button>
                <Button
                    color={props.filter === 'active' ? 'secondary' : 'primary'}
                    onClick={onActiveClick}> Active</Button>
                <Button
                    color={props.filter === 'completed' ? 'secondary' : 'primary'}
                    onClick={onCompletedClick}>Completed</Button>
            </div>
        </div>
    )
}