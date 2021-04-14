import {TaskType} from "./AppRedux";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox} from "@material-ui/core";
import EditableSpan from "./EditableSpan";

interface newTaskType extends TaskType {
    removeTask: (taskId: string) => void
    changeStatus: (taskId: string, newIsDoneValue: boolean) => void
    changeTaskTitle: (taskId: string, newTitle: string) => void
}

export const Task = React.memo((props:newTaskType) => {
    const {isDone,
        id,
        title,
        changeStatus,
        changeTaskTitle,
        removeTask,
        } = props

    const onRemoveClick = () => removeTask(id )
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        changeStatus(id, newIsDoneValue)
    }
    const onChangeTaskTitle =(newTitle: string) => {
        changeTaskTitle(id, newTitle)
    }
    return (
        <li className={isDone ? 'is-done' : ''}>
            <Checkbox
                color={"primary"}
                checked={isDone}
                onChange={onChangeHandler}
            />
            <EditableSpan title={title} changeTaskTitle={onChangeTaskTitle}/>
            <button onClick={onRemoveClick}>x</button>
        </li>
    )
})