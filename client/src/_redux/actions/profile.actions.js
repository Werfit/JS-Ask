import axios from 'utils/api'
import tokenConfig from 'utils/tokenConfig'

import { PROFILE_LOADING, PROFILE_LOADED } from '../types'

export const getProfile = () => async (dispatch, getState) => {
    dispatch({ type: PROFILE_LOADING })

    try {
        const result = await axios.get('/profiles/', tokenConfig(getState))

        dispatch({
            type: PROFILE_LOADED,
            payload: result.data
        })
    } catch (err) { }
}

export const updateProfile = profile => async (dispatch, getState) => {
    try {
        const _profile = { first_name: profile.firstName, last_name: profile.lastName, email: profile.email, birth_date: profile.birthDate }
        const result = await axios.patch('/profiles/', _profile, tokenConfig(getState))

        dispatch({
            type: PROFILE_LOADED,
            payload: result.data
        })
    } catch (err) { }
}