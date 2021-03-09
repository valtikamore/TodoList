import React, {useState, KeyboardEvent, ChangeEvent} from "react";

type addItemType = {
    addItem:(title:string) => void
}

 function AddItemForm(props:addItemType) {
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
            <input
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressAddItem}
                className={error ? 'error' : ''}
            />
            <button onClick={addTask}
            >+</button>
            {error && <div className={'error-message'}>Title is empty</div>}
        </div>
    )
}
export default AddItemForm