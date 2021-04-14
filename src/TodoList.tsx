import React, {ChangeEvent, useCallback} from "react";

import {FilteredValuesType, TaskType} from "./AppRedux";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {AddItemForm} from "./addItemForm";

type TodoListPropsType = {
    todoListID: string
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


export const TodoList = React.memo((props: TodoListPropsType) => {
    console.log('todolist')
    const addTask = (title: string) => {
        props.addTask(title, props.todoListID)
    }
    const onAllClick = useCallback(() => props.changeFilter('all', props.todoListID),[])
    const onActiveClick = useCallback(() => props.changeFilter('active', props.todoListID),[])
    const onCompletedClick = useCallback(() => props.changeFilter('completed', props.todoListID),[])

    let tasksForTodoList = props.tasks
    if (props.filter === 'active') {
        tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
    }
    if (props.filter === 'completed') {
        tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
    }
    const removeTodolist = () => props.removeTodolist(props.todoListID)
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.todoListID)
    }

    const tasks = tasksForTodoList.map(t => {
        const onRemoveClick = () => props.removeTask(t.id, props.todoListID)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked
            props.changeStatus(t.id, newIsDoneValue, props.todoListID)
        }
        const changeTaskTitle = (newTitle: string) => {
            props.changeTaskTitle(t.id, newTitle, props.todoListID)
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
})