import React, {ChangeEvent, useCallback} from "react";

import {FilteredValuesType, TaskType} from "../App/AppRedux";
import EditableSpan from "../EditableSpan/EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {AddItemForm} from "../AddItemForm/addItemForm";
import {Task} from "../Task/Task";

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
    const onAllClick = useCallback(() => props.changeFilter('all', props.todoListID),[props])
    const onActiveClick = useCallback(() => props.changeFilter('active', props.todoListID),[props])
    const onCompletedClick = useCallback(() => props.changeFilter('completed', props.todoListID),[props])

    let tasksForTodoList = props.tasks
    if (props.filter === 'active') {
        tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
    }
    if (props.filter === 'completed') {
        tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
    }
    const removeTodolist =useCallback (() => props.removeTodolist(props.todoListID),[props.todoListID])
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.todoListID)
    }


    const onClickHandler = useCallback((taskId: string) => {
        props.removeTask(taskId, props.todoListID)
    },[props.removeTask, props.todoListID])

    const onChangeHandler = useCallback((taskId: string, isDone: boolean) => {
        props.changeStatus(taskId, isDone, props.todoListID);
    },[props.todoListID, props.changeStatus])

    const onTitleChangeHandler = useCallback((taskId: string, newValue: string) => {
        props.changeTaskTitle(taskId, newValue, props.todoListID);
    },[props.todoListID, props.changeTaskTitle])

    const tasks = tasksForTodoList.map(t => (
        <Task
            key={t.id}
            task={t}
            removeTask={onClickHandler}
            changeStatus={onChangeHandler}
            changeTaskTitle={onTitleChangeHandler}
    />)
    )
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
