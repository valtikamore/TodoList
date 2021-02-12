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
    let tasks1 = [
        {id:1,title:'Html&css',isDone:true},
        {id:2,title:'JS',isDone:true},
        {id:3,title:'React',isDone:false},
        {id:4,title:'Rest API',isDone:false},
        {id:5,title:'GraphQL',isDone:false},
    ])

    return (
        <div className="App">
            <TodoList title={'Hello world'}
                      tasks={tasks1}
                      />
        </div>
    );
}

export default App;
