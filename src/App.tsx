import React, {useState} from 'react';
import { v1 } from 'uuid';
import './App.css';
import {TodoList} from "./TodoList";
import AddItemForm from "./addItemForm";

export type FilteredValuesType = 'all'|'completed'|'active'
export type TaskType =  {
    id:string
    title:string
    isDone:boolean
}
type TodoListType = {
    id:string
    title:string
    filter:FilteredValuesType
}
 export type TasksStateType = {
    [key:string] : TaskType[]
}

function App() {
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const[todoLists,setTodoLists] = useState<TodoListType[]>([
        {id:todoListID_1,title:'What to learn',filter:'all'},
        {id:todoListID_2,title:'What to learn version',filter:'all'},
    ])
    const [tasks,setTasks] = useState<TasksStateType>({
        [todoListID_1]:[
            {id:v1(),title:'Html&css',isDone:true},
            {id:v1(),title:'JS',isDone:true},
            {id:v1(),title:'React',isDone:false},
            {id:v1(),title:'Rest API',isDone:false},
            {id:v1(),title:'GraphQL',isDone:false},
        ],
        [todoListID_2]:[
            {id:v1(),title:'Algorithms & data structure',isDone:true},
            {id:v1(),title:'Blockchain',isDone:true},
            {id:v1(),title:'Vue',isDone:false},
            {id:v1(),title:'MongoDB',isDone:false},
        ],
    })
    function removeTask(taskId:string, todoListId:string) {
        // const  todolistTasks = tasks[todoListId]
        // const  filteredTasks = todolistTasks.filter(t => t.id !== taskId)
        // tasks[todoListId] = filteredTasks
        tasks[todoListId] = tasks[todoListId].filter(t =>t.id !== taskId)
        setTasks({...tasks})
    }
    function addTask (title:string,todoListId:string) {
        const newTask:TaskType = {
            id:v1(),
            title:title,
            isDone:false,
        }
        const todolistTasks = tasks[todoListId]
        tasks[todoListId] = [newTask,...todolistTasks]
        setTasks({...tasks})
    }
    function changeStatus(taskId:string,isDoneTask:boolean,todoListId:string) {
        const todoListTasks = tasks[todoListId]
        const task = todoListTasks.find(t => t.id === taskId)
        if(task) {
            task.isDone = isDoneTask
            setTasks({...tasks})
        }
    }
    function changeTaskTitle(taskId:string,newTitle:string,todoListId:string) {
        const todoListTasks = tasks[todoListId]
        const task = todoListTasks.find(t => t.id === taskId)
        if(task) {
            task.title = newTitle
            setTasks({...tasks})
        }
    }
    function changeFilter (newFilterValue:FilteredValuesType,todoListId:string) {
        const todoList = todoLists.find(t => t.id === todoListId)
        if(todoList) {
            todoList.filter = newFilterValue
            setTodoLists([...todoLists])
        }
    }
    function changeTodoListTitle (newTitle:string,todoListId:string) {
        const todoList = todoLists.find(t => t.id === todoListId)
        if(todoList) {
            todoList.title = newTitle
            setTodoLists([...todoLists])
        }
    }
    function removeTodolist (todoListId:string) {
        setTodoLists(todoLists.filter(t => t.id !== todoListId))
        delete tasks[todoListId]
    }
    function addTodoList (title:string) {
        const newTodoListId = v1()
        const newTodoList:TodoListType = {id:newTodoListId,title,filter:'all'}
        setTodoLists([newTodoList,...todoLists])
        setTasks({...tasks,[newTodoListId]:[]})
    }
    const todolistComponents = todoLists.map(tl => {
        let  tasksForTodoList = tasks[tl.id]
        if(tl.filter === 'active') {
            tasksForTodoList = tasksForTodoList.filter(t => !t.isDone )
        }
        if(tl.filter === 'completed') {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
        }
        return (
            <TodoList todolistID={tl.id}
                      title={tl.title}
                      filter={tl.filter}
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeStatus={changeStatus}
                      removeTodolist={removeTodolist}
                      changeTaskTitle={changeTaskTitle}
                      changeTodoListTitle={changeTodoListTitle}
            />
        )
    })
    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {todolistComponents}
        </div>
    );
}

export default App;
