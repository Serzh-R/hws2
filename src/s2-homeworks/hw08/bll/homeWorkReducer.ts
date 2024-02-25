import {initialPeople, UserType} from '../HW8'

type ActionType =
    | { type: 'sort'; payload: 'up' | 'down' }
    | { type: 'check'; payload: number }

export const homeWorkReducer = (state = initialPeople, action: ActionType):UserType[]  => { // need to fix any
    switch (action.type) {
        case 'sort': {
            if (action.payload === 'up') {
                return [...state].sort((a, b) => a.name.localeCompare(b.name));
            }
            if (action.payload === 'down') {
                return [...state].sort((a, b) => b.name.localeCompare(a.name));
            }
            return state
            }
        case 'check': {

            return state.filter(a => a.age >= action.payload)
        }
        default:
            return state
    }
}
