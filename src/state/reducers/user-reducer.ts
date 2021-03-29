
type initialState = {
    name:string
    age:number
    children:{age:number,name:string}
}
type incrementAgeType = {
    type:'INCREMENT-AGE'
}
type incrementChildrenAgeType = {
    type:'INCREMENT-CHILDREN-AGE'
}
 type changeName = {
    type:'CHANGE-NAME'
    newName:string
}
type changeUser = {
    type:'CHANGE-USER',
    newName:string
    age:number
}
type allActionsType = incrementAgeType | incrementChildrenAgeType | changeName | changeUser

export const userReducer = (state:initialState,action:allActionsType) => {
    switch (action.type) {
        case "INCREMENT-AGE":{
            return {
                ...state,
                age : state.age + 1
            }
        }
        case "INCREMENT-CHILDREN-AGE" : {
            return {
                ...state,
                children:
                    {...state.children,
                        age:state.children.age + 1
                    }
            }
        }
        case "CHANGE-NAME": {
            return {
                ...state,
                name:action.newName
            }
        }
        case "CHANGE-USER": {
            return {
                ...state,
                name:action.newName,
                age:action.age
            }
        }
        default :
            throw new Error('error')
    }
}