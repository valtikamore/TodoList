import React, {useState} from 'react';
import { v1 } from 'uuid';
import './App.css';
import {TodoList} from "./TodoList";

export type TaskType =  {
    id:string
    title:string
    isDone:boolean
}
export type FilteredValuesType = 'all'|'completed'|'active'

function App() {
    let [tasks,setTasks] = useState([
        {id:v1(),title:'Html&css',isDone:true},
        {id:v1(),title:'JS',isDone:true},
        {id:v1(),title:'React',isDone:false},
        {id:v1(),title:'Rest API',isDone:false},
        {id:v1(),title:'GraphQL',isDone:false},
    ])

    function removeTask(taskId:string) {
        let filteredTasks = tasks.filter(t => t.id !== taskId)
        setTasks(filteredTasks)
    }
    let [filter,setFilter] = useState<FilteredValuesType>('all')

    let  tasksForTodoList = tasks
    if(filter === 'active') {
        tasksForTodoList = tasks.filter(t => !t.isDone )
    }
    if(filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }
    function changeFilter (value:FilteredValuesType) {
        setFilter(value)
    }
    function addTask (title:string) {
        const newTask:TaskType = {
            id:v1(),
            title:title,
            isDone:false,
        }
        setTasks([newTask,...tasks])
    }
    return (
        <div className="App">
            <TodoList title={'Hello world'}
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}/>
        </div>
    );
}

export default App;
