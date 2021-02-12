import React from "react";
import {FilteredValuesType, Task1Type} from "./App";
export type TodoListType = {
    title:string
    tasks:Array<Task1Type>
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

                    </li>)
                }
            </ul>
            <div>
                <button >All</button>
                <button> Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}