import React, {ChangeEvent} from "react";
import {filteredTasksType, Task1Type} from "./AppUseReducers";
import {AddItemForm} from "./addItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import { Delete} from "@material-ui/icons";

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

    const addTask = (title: string) =>  props.addTask(title,props.id)
    const removeTodolist = () =>   props.removeTodoList(props.id)
    const changeTodoListTitle = (title:string) =>  props.changeTodoListTitle(props.id,title)
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
            <Checkbox
                color={'secondary'}
                checked={t.isDone}
                onChange={onChangeHandler}/>
            <EditableSpan value={t.title} onChange={onChangeTaskTitle}/>
            <IconButton>
                <Delete onClick={onClickHandller}/>
            </IconButton>
        </li>
    })

    return (
        <div>
            <EditableSpan value={props.title} onChange={changeTodoListTitle}/>
            <IconButton>
                <Delete onClick={removeTodolist}/>
            </IconButton>
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasksMap}
            </ul>
            <div>
                <Button
                    color={props.filter === 'all'
                        ? 'secondary'
                        : 'primary'}
                    variant="outlined"
                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    color={props.filter === 'active'
                        ? 'secondary'
                        : 'primary'}
                    variant="outlined"
                    onClick={onActiveClickHandler}> Active
                </Button>
                <Button
                    color={props.filter === 'completed'
                        ? 'secondary'
                        : 'primary'}
                    variant="outlined"
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
}