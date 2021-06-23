import { USERS_FOUND, USERS_LOADING, USERS_CLEAR } from '../types'

import axios from 'utils/api'
import tokenConfig from 'utils/tokenConfig'

export const findUser = username => async (dispatch, getState) => {
    dispatch({ type: USERS_LOADING })

    try {
        const result = await axios.post('/accounts/find/', { username }, tokenConfig(getState))

        dispatch({
            type: USERS_FOUND,
            payload: result.data
        })
    } catch (err) {
        // TODO: Add error handler
    }
}

export const clearList = () => dispatch => dispatch({ type: USERS_CLEAR })