import {TaskType} from "../App/AppRedux";
import React, {ChangeEvent} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "../EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";

export type TaskPropsType = {
    task:TaskType
    removeTask: (taskId: string) => void
    changeStatus: (taskId: string, newIsDoneValue: boolean) => void
    changeTaskTitle: (taskId: string, newTitle: string) => void
}

export const Task = React.memo((props:TaskPropsType) => {
    const {task,
        changeStatus,
        changeTaskTitle,
        removeTask,
        } = props

    const onRemoveClick = () => removeTask(task.id )
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        changeStatus(task.id, newIsDoneValue)
    }
    const onChangeTaskTitle =(newTitle: string) => {
        changeTaskTitle(task.id, newTitle)
    }
    return (
        <li className={task.isDone ? 'is-done' : ''}>
            <Checkbox
                color={"primary"}
                checked={task.isDone}
                onChange={onChangeHandler}
            />
            <EditableSpan title={task.title} changeTaskTitle={onChangeTaskTitle}/>
            <IconButton onClick={onRemoveClick}>
                <Delete/>
            </IconButton>
        </li>
    )
})