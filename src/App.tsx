import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export type Task1Type =  {
    id:number
    title:string
    isDone:boolean
}
function App() {
    const task1:Array<Task1Type> = [
        {id:1,title:'Html&css',isDone:true},
        {id:1,title:'Js',isDone:true},
        {id:1,title:'React',isDone:false},
    ]
    return (
        <div className="App">
            <TodoList title={'Hello world'} tasks={task1}/>
        </div>
    );
}

export default App;
