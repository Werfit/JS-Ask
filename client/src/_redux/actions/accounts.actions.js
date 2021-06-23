import axios from 'utils/api'

import tokenConfig from 'utils/tokenConfig'

import {
    USER_SUCCESS,
    USER_FAILED,
    USER_LOADING,
    USER_LOADED,
    USER_LOGOUT,
    SUCCESS_ALERT
} from '../types'

export const authenticateUser = ({ user, register = false }) => async (dispatch, getState) => {
    dispatch({ type: USER_LOADING })

    try {
        const action = register ? 'register' : 'login'
        const result = await axios.post(`/accounts/${action}/`, user, tokenConfig(getState))

        dispatch({
            type: USER_SUCCESS,
            payload: result.data
        })
    } catch (err) {
        dispatch({ type: USER_FAILED })
    }
}

export const loadUser = () => async (dispatch, getState) => {
    dispatch({ type: USER_LOADING })

    try {
        const result = await axios.get('/accounts/user/', tokenConfig(getState))

        dispatch({
            type: USER_LOADED,
            payload: result.data
        })
    } catch (err) {
        dispatch({ type: USER_FAILED })
    }
}

export const logoutUser = () => dispatch => dispatch({ type: USER_LOGOUT })

export const changePassword = passwords => async (dispatch, getState) => {
    try {
        await axios.patch('/accounts/change/', passwords, tokenConfig(getState))

        dispatch({ type: SUCCESS_ALERT })
    } catch (err) { }
}