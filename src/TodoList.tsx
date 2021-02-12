import React from "react";
import {FilteredValuesType, Task1Type} from "./App";
export type TodoListType = {
    title:string
    tasks:Array<Task1Type>
    removeTask:(taskId:number) => void
    changeFilter:(value:FilteredValuesType) => void
}
export function TodoList(props:TodoListType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(t => <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={() => {props.removeTask(t.id)}}>XXX</button>
                    </li>)
                }
            </ul>
            <div>
                <button onClick={() => {props.changeFilter('all')}}>All</button>
                <button onClick={() => {props.changeFilter('active')}}> Active</button>
                <button onClick={() => {props.changeFilter('completed')}}>Completed</button>
            </div>
        </div>
    )
}