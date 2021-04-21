import React, {useState, KeyboardEvent, ChangeEvent, useCallback} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

export type addItemType = {
    addItem:(title:string) => void
}

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
             <TextField
                 variant={"outlined"}
                 value={title}
                 onChange={onChangeHandler}
                 onKeyPress={onKeyPressHandler}
                 error={!!error}
                 label={'TITLE'}
                 helperText={error}
             />
             <IconButton
                 color={"primary"}
                 onClick={addItem}
             >
                 <AddBox/>
             </IconButton>
         </div>
     )
 })
