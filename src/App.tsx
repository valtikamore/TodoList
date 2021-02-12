import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export type Task1Type =  {
    id:number
    title:string
    isDone:boolean
}
export type FilteredValuesType = 'all'|'completed'|'active'

function App() {
    let [tasks1,setTasks1] = useState([
        {id:1,title:'Html&css',isDone:true},
        {id:2,title:'JS',isDone:true},
        {id:3,title:'React',isDone:false},
        {id:4,title:'Rest API',isDone:false},
        {id:5,title:'GraphQL',isDone:false},
    ])

    function removeTask(taskId:number) {
        let filteredTasks = tasks1.filter(t => t.id !== taskId)
        setTasks1(filteredTasks)
    }
    let [filter,setFilter] = useState<FilteredValuesType>('all')
    let  tasksForTodoList = tasks1
    if(filter === 'active') {
        tasksForTodoList = tasks1.filter(t => !t.isDone )
    }
    if(filter === 'completed') {
        tasksForTodoList = tasks1.filter(t => t.isDone)
    }
    function changeFilter (value:FilteredValuesType) {
        setFilter(value)
    }
    return (
        <div className="App">
            <TodoList title={'Hello world'}
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter} />
        </div>
    );
}

export default App;
