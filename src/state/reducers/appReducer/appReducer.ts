export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error:null as null | string
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS': {
            return {...state, status: action.status}
        }
        case "APP/SET-ERROR": {
            return {...state,error:action.error}
        }
        default:
            return state
    }
}
export const setAppStatusAC = (status:RequestStatusType) => ({type:'APP/SET-STATUS',status}as const)

export const setErrorAppAC = (error:string|null) => ({type:'APP/SET-ERROR',error}as const)

export type setAppActionType = ReturnType<typeof setAppStatusAC>
export type setErrorActionType = ReturnType<typeof setErrorAppAC>

type ActionsType = setAppActionType | setErrorActionType