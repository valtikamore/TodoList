import './App.css';
import {TodoList} from "./TodoList";
import {useState} from "react";


export type filteredTasksType = 'all'|'active'|'completed'
export type Task1Type = {
    id: number
    title: string
    isDone: boolean
}


function App() {
    const [tasks,setTasks] = useState([
        {id: 1, title: 'Html&css', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Rest API', isDone: false},
        {id: 5, title: 'GraphQL', isDone: false},
        {id: 6, title: 'GraphQL', isDone: false},
        {id: 7, title: 'GraphQL', isDone: false},
    ])
    function removeTask(taskId: number) {
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


    return (
        <div className="App">
            <TodoList title={'Hello world'}
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
