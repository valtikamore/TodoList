import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";


export type addItemType = {
    addItem:(title:string) => void
    disabled?:boolean}

export const AddItemForm = React.memo(({addItem,disabled = false}:addItemType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<null | string>(null)

    const addItemHandler = () => {
        const trimmedTask = title.trim()
        if (trimmedTask) {
            addItem(trimmedTask)
            setTitle('')
        } else {
            setError('Title is requared')
        }

    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        setTitle(event.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {

        if (e.key === 'Enter' && title !== '') {
            addItem(title.trim())
            setTitle('')
        }
    }

    return (
        <div>
            <TextField disabled={disabled}
                       variant={"outlined"}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       error={!!error}
                       label={'TITLE'}
                       helperText={error}
            />
            <IconButton disabled={disabled}
                        color={"primary"}
                        onClick={addItemHandler}
            >
                <AddBox/>
            </IconButton>
        </div>
    )
})
