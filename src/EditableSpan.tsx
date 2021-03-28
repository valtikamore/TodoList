import { TextField } from "@material-ui/core";
import React, {useState} from "react";


type EditableSpanPropsType = {
    title: string
    changeTaskTitle: (newTitle: string) => void
}


function EditableSpan(props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title,setTitle] = useState<string>(props.title)

    const onDoubleClick = () => {
        setEditMode(!editMode)
    }
    const onBlur = () => {
        setEditMode(false)
        props.changeTaskTitle(title)
    }
    const onChange= (e:any) => {
        setTitle(e.currentTarget.value)

    }
    const onEnter = (e:any) => {
        if(e.key === 'Enter') {
            setEditMode(!editMode)
            props.changeTaskTitle(title)
        }
    }
    return (
        editMode
            ? <TextField type="text" onBlur={onBlur} value={title} autoFocus onChange={onChange} onKeyPress={onEnter}/>
            : <span onDoubleClick={onDoubleClick}>{props.title}</span>
    )
}

export default EditableSpan