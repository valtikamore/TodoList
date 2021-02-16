import './App.css';
import {TodoList} from "./TodoList";
import {useState} from "react";
import { v1 } from 'uuid';


export type filteredTasksType = 'all'|'active'|'completed'
export type Task1Type = {
    id: string
    title: string
    isDone: boolean
}


function App() {
    const [tasks,setTasks] = useState([
        {id: v1(), title: 'Html&css', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Rest API', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false},
    ])
    function removeTask(taskId: string) {
        let filteredTasks= tasks.filter(t => t.id !== taskId)
        setTasks(filteredTasks)
    }
    const [filter,setFilter] = useState<filteredTasksType>('all')

    let tasksForTodoList = tasks
    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    }
    function changeFilter(value: filteredTasksType) {
        setFilter(value)
    }
    function addTask (title:string) {
        let newTask = {id:v1(), title:title, isDone:false,}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }


    return (
        <div className="App">
            <TodoList title={'Hello world'}
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
        </div>
    );
}

export default App;
