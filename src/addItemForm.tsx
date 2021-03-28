import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import { IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type addItemType = {
    addItem:(title:string) => void
}

 export function AddItemForm(props:addItemType) {
    const [title,setTitle] = useState<string>('')
    const [error,setError] = useState<boolean>(false)
    const onChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError(false)}
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if(e.key === 'Enter' && title !== '') {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError(true)
        }
    }
    const addTask = () => {
        const trimmedTask = title.trim()
        if(trimmedTask) {
            props.addItem(trimmedTask)
        } else {
            setError(true)
        }
        setTitle('')
    }
    return (
        <div>
            <TextField
                variant={"outlined"}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressAddItem}
                error={!!error}
                label={'TITLE'}
                helperText={error}
            />
            <IconButton
                color={"primary"}
                onClick={addTask}
            >
                <AddBox/>
            </IconButton>
        </div>
    )
}
