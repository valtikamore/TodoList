import React, {ChangeEvent, KeyboardEvent, useState} from "react";



type AddItemFromPropsType = {
    addItem:(title:string) => void
}

export function AddItemForm  (props:AddItemFromPropsType) {
    const [title,setTitle] = useState('')
    const [error,setError] = useState<boolean>(false)
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
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error?'error':''}/>
            <button onClick={addItem}>+</button>
            {error && <div className='error-message'>Field is empty</div> }
        </div>

    )
}



