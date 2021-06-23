import { PROFILE_LOADING, PROFILE_LOADED } from "_redux/types"

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    isLoading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case PROFILE_LOADED:
            return {
                ...state,
                isLoading: false,
                firstName: action.payload.profile.first_name || '',
                lastName: action.payload.profile.last_name || '',
                email: action.payload.profile.email || '',
                birthDate: action.payload.profile.birth_date || '1970-01-01'
            }
        default:
            return state
    }
}