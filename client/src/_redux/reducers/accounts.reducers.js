import {
    USER_SUCCESS,
    USER_FAILED,
    USER_LOADING,
    USER_LOADED,
    USER_LOGOUT
} from '../types'

const initialState = {
    user: null,
    token: localStorage.getItem('user_token'),
    isLoading: false,
    isAuthenticated: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_SUCCESS:
            localStorage.setItem('user_token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isLoading: false,
                isAuthenticated: true
            }
        case USER_FAILED:
        case USER_LOGOUT:
            localStorage.removeItem('user_token')
            return {
                ...state,
                user: null,
                token: null,
                isLoading: false,
                isAuthenticated: false
            }
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case USER_LOADED:
            return {
                ...state,
                user: action.payload.user,
                isLoading: false,
                isAuthenticated: true
            }
        default:
            return state
    }
}