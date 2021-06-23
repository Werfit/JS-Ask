import { USERS_LOADING, USERS_FOUND, USERS_CLEAR } from '../types'

const initialState = {
    list: [],
    isLoading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case USERS_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case USERS_FOUND:
            return {
                ...state,
                isLoading: false,
                list: action.payload.users
            }
        case USERS_CLEAR:
            return {
                ...state,
                list: []
            }
        default:
            return state
    }
}
