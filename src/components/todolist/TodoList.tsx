import React, {ChangeEvent} from "react";
import {filteredTasksType, TaskType} from "../../AppWithRedux";
import {AddItemForm} from "../../addItemForm";
import {EditableSpan} from "../../EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import { Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../State/redux/store";
import {
    AddTaskAC,
    ChangeTaskStatusAC,
    ChangeTaskTitleAC,
    RemoveTaskAC
} from "../../State/reducers/todoTask-reducer/todoTask-reducer";

export type TodoListTypeProps = {
    id: string
    title: string
    removeTodoList: (todoListId: string) => void
    changeFilter: (value: filteredTasksType, todoListId: string) => void
    changeTodoListTitle:( Id: string,newTitle: string) => void
    filter: filteredTasksType
}

export const TodoList = React.memo((props: TodoListTypeProps) => {
    const tasks = useSelector<AppRootState,TaskType[]>((state => state.tasks[props.id]))
    const dispatch = useDispatch()


    const removeTodolist = () =>   props.removeTodoList(props.id)
    const changeTodoListTitle = (title:string) =>  props.changeTodoListTitle(props.id,title)
    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)
    let alltodolistTasks = tasks
    let tasksForTodoList = alltodolistTasks
    if (props.filter === 'active') {
        tasksForTodoList = alltodolistTasks.filter(t => !t.isDone)
    }
    if (props.filter === 'completed') {
        tasksForTodoList = alltodolistTasks.filter(t =>t.isDone )
    }

    const tasksMap =tasksForTodoList.map(t => {
        const onClickHandller = () => {
            dispatch(RemoveTaskAC(t.id,props.id))
        }
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked
            dispatch(ChangeTaskStatusAC(props.id,t.id,newIsDoneValue))
        }
        const onChangeTaskTitle = (title:string) => {
            dispatch(ChangeTaskTitleAC(t.id,title,props.id))
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
            <AddItemForm addItem={(title)=>dispatch(AddTaskAC(title,props.id))}/>
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
})