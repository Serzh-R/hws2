export type InitStateType = {
    themeId: number
}

const initState = {
    themeId: 1,
}

type ChangeThemeIdActionType = ReturnType<typeof changeThemeId>
type ActionType = ChangeThemeIdActionType

export const themeReducer = (state: InitStateType = initState, action: ActionType): InitStateType => { // fix any
    switch (action.type) {
        // дописать
        case 'SET_THEME_ID': {
            return {...state, themeId: action.payload.id}
        }
        default:
            return state
    }
}

export const changeThemeId = (id: number) => {
    return {
        type: 'SET_THEME_ID',
        payload: {
            id
        }
    } as const // fix any
}