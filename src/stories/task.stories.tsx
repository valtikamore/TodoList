import React, {useEffect, useState} from 'react'
import {tasksAPI, todolistsAPI} from "../api/todolistAPI";

export default {
    title: 'API/tasks'
}

export const GetTasks = () => {
    const [todolists, setTodolists] = useState<any>(null)
    const [tasks, setTasks] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('');

    useEffect(() => {
        todolistsAPI.getTodos()
            .then(res => {
                setTodolists(res.data)
            })

    }, [])
    useEffect(() => {
        tasksAPI.getTasks(todolistId)
            .then(res => {
                setTasks(res.data)
            })

    }, [])

    const onChangeHandlerTodolist = (e:any) => {
        setTodolistId(e.currentTarget.value)
    }
    const onClick = () => {
        tasksAPI.getTasks(todolistId).then(res => {
            setTasks(res.data)
        })
    }
    return (
        <div>
            <div> {JSON.stringify(todolists)}</div>
            <div> {JSON.stringify(tasks)}</div>
            <input type="text" value={todolistId} onChange={onChangeHandlerTodolist} placeholder={'todolist id' }/>
            <button onClick={onClick}> get task </button>
        </div>
    )

}
export const CreateTask = () => {

    const [todolists, setTodolists] = useState<any>(null)
    const [tasks, setTasks] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('');
    const [taskTitle, setTaskTitle] = useState<string>('');

    useEffect(() => {
        todolistsAPI.getTodos()
            .then(res => {
                setTodolists(res.data)
            })
    }, [])

    useEffect(() => {
        tasksAPI.getTasks(todolistId)
            .then(res => {
                setTasks(res.data)
            })

    }, [])

    const onChangeHandlerTodolist = (e:any) => {
        setTodolistId(e.currentTarget.value)
    }
    const onChangeHandlerTask = (e:any) => {
        setTaskTitle(e.currentTarget.value)
    }
    const onClick = () => {
        tasksAPI.createTask(todolistId,taskTitle).then(res => {
            setTasks(res.data.data)
        })
    }
    return(
        <div>
            <div> {JSON.stringify(todolists)}</div>
            <div> {JSON.stringify(tasks)}</div>

            <input type="text" value={todolistId} onChange={onChangeHandlerTodolist} placeholder={'todolist id' }/>
            <input type="text" value={taskTitle} onChange={onChangeHandlerTask}placeholder={'task title' }/>
            <button onClick={onClick}> add task </button>
        </div>
       )
}
export const DeleteTask = () => {
    const [todolists, setTodolists] = useState<any>(null)
    const [tasks, setTasks] = useState<any>(null);

    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    useEffect(() => {
        todolistsAPI.getTodos()
            .then(res => {
                setTodolists(res.data)
            })

    }, [])
    useEffect(() => {
        tasksAPI.getTasks(todolistId)
            .then(res => {
                setTasks(res.data)
            })

    }, [])
    const onChangeHandlerTodo = (e:any) => {
        setTodolistId(e.currentTarget.value)
    }
    const onChangeHandlerTask = (e:any) => {
        setTaskId(e.currentTarget.value)
    }
    const onClick = () => {
        tasksAPI.deleteTask(todolistId,taskId).then(res => {
            setTasks(res.data)
        })
    }
    return(
        <div>
            <div> {JSON.stringify(todolists)}</div>
            <div> {JSON.stringify(tasks)}</div>
            <input type="text" value={todolistId} onChange={onChangeHandlerTodo} placeholder={'todoID'}/>
            <input type="text" value={taskId} onChange={onChangeHandlerTask} placeholder={'taskID'}/>
            <button onClick={onClick}> delete task </button>
        </div>
    )
}
export const UpdateTask = () => {
    const [todolists, setTodolists] = useState<any>(null)
    const [tasks, setTasks] = useState<any>(null);

    const [todolistId, setTodolistId] = useState<string>('')

    const [taskId, setTaskId] = useState<string>('')
    const [taskTitle, setTaskTitle] = useState<string>('')

    // set to all handlers
    const [description, setTdescription] = useState<string>('')
    const [status, setstatus] = useState<number>(0)
    const [priority, setpriority] = useState<number>(0)
    const [startDate, setstartDate] = useState<string>('')
    const [deadline, setdeadline] = useState<string>('')
    // set to all handlers
    useEffect(() => {
        todolistsAPI.getTodos()
            .then(res => {
                setTodolists(res.data)
            })

    }, [])
    useEffect(() => {
        tasksAPI.getTasks(todolistId)
            .then(res => {
                setTasks(res.data)
            })

    }, [])
    const onChangeHandlerTodo = (e:any) => {
        setTodolistId(e.currentTarget.value)
    }
    const onChangeHandlerTask = (e:any) => {
        setTaskId(e.currentTarget.value)
    }
    const onChangeHandlerTaskTitle = (e:any) => {
        setTaskTitle(e.currentTarget.value)
    }
    const onClick = () => {
        tasksAPI.updateTask(todolistId,taskId,{
            description:description,
            title:taskTitle,
            status:status,
            priority:priority,
            startDate,
            deadline
        }).then(res => {
            setTasks(res.data)
        })
    }
    return(
        <div>
            <div> {JSON.stringify(todolists)}</div>
            <div> {JSON.stringify(tasks)}</div>
            <input type="text" value={todolistId} onChange={onChangeHandlerTodo} placeholder={'todoID'}/>
            <input type="text" value={taskId} onChange={onChangeHandlerTask} placeholder={'taskID'}/>

            <input type="text" value={description} onChange={onChangeHandlerTask} placeholder={'description'}/>
            <input type="text" value={status} onChange={onChangeHandlerTask} placeholder={'status'}/>
            <input type="text" value={priority} onChange={onChangeHandlerTask} placeholder={'priority'}/>
            <input type="text" value={startDate} onChange={onChangeHandlerTask} placeholder={'startDate'}/>
            <input type="text" value={priority} onChange={onChangeHandlerTask} placeholder={'priority'}/>

            <input type="text" value={deadline} onChange={onChangeHandlerTaskTitle} placeholder={'task deadline'}/>

            <button onClick={onClick}> update task </button>
        </div>
    )
}

