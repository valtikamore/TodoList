import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    value:string
    onChange:(title:string) => void
}

export function EditableSpan (props:EditableSpanPropsType) {
    const [editMode,setEditMode] = useState<boolean>(false)
    const [title,setTitle] = useState<string>(props.value)

    const onDoubleClick = () => {
        setEditMode(true)
        setTitle(props.value)
    }
    const onBlur = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onEnter = (e:any) => {
        if(e.key === 'Enter') {
            setEditMode(false)
            props.onChange(title)
        }

    }
    return (
        editMode
             ? <TextField
                variant={'standard'}
                color='secondary'
                type="text"
                onBlur={onBlur}
                value={title}
                onChange={onChangeHandler}
                autoFocus
                onKeyPress={onEnter}/>
            : <span onDoubleClick={onDoubleClick}>{props.value}</span>
    )
}