import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {AddBoxOutlined} from "@material-ui/icons";


type AddItemFromPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFromPropsType) {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<boolean>(false)
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {setTitle(e.currentTarget.value) }

    const addItem = () => {
        if(title.trim() !== '') {
            props.addItem(title)
            setTitle('')
        } else {
            setError(true)
        }

    }
    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (e.key === 'Enter') {
            addItem()
        }
    }

    return (
        <div>
            <TextField
                variant='outlined'
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                label='Todolist title'
                error={error}
                helperText={error && 'Title is require'}
            />
            <IconButton>
                <AddBoxOutlined
                    fontSize={"large"}
                    onClick={addItem}/>
            </IconButton>
        </div>

    )
}



