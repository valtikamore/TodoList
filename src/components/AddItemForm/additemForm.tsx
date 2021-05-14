import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";
import {RequestStatusType} from "../../state/reducers/appReducer/appReducer";

export type addItemType = {
    addItem:(title:string) => void
    entityStatus?:RequestStatusType}

export const AddItemForm = React.memo((props:addItemType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<null | string>(null)
    console.log('additemform')

    const addItem = () => {
        const trimmedTask = title.trim()
        if (trimmedTask) {
            props.addItem(trimmedTask)
        } else {
            setError('Title is requared')
        }
        setTitle('')
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        setTitle(event.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {

        if (e.key === 'Enter' && title !== '') {
            props.addItem(title.trim())
            setTitle('')
        }
    }

    return (
        <div>
            <TextField disabled={props.entityStatus === 'loading'}
                       variant={"outlined"}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       error={!!error}
                       label={'TITLE'}
                       helperText={error}
            />
            <IconButton disabled={props.entityStatus === 'loading'}
                        color={"primary"}
                        onClick={addItem}
            >
                <AddBox/>
            </IconButton>
        </div>
    )
})
