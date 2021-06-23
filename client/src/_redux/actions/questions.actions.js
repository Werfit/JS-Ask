import { QUESTION_SUCCESS, QUESTION_FAILED, QUESTIONS_LOADING, QUESTIONS_LOADED, QUESTIONS_FAILED, QUESTION_REMOVED } from '../types'
import axios from 'utils/api'
import tokenConfig from 'utils/tokenConfig'


// TODO: Add error handler
export const askQuestion = (question, target) => async (dispatch, getState) => {
    try {
        await axios.post(`/questions/${target}/new/`, question, tokenConfig(getState))

        dispatch({ type: QUESTION_SUCCESS })
    } catch (err) {
        dispatch({ type: QUESTION_FAILED, payload: err.response })
    }
}

export const getQuestions = () => async (dispatch, getState) => {
    dispatch({ type: QUESTIONS_LOADING })
    try {
        const result = await axios.get('/questions/all/', tokenConfig(getState))

        dispatch({
            type: QUESTIONS_LOADED,
            payload: result.data
        })
    } catch (err) {
        dispatch({ type: QUESTIONS_FAILED, payload: err.response })
    }
}

export const removeQuestion = id => async (dispatch, getState) => {
    try {
        await axios.delete(`/questions/${id}/remove/`, tokenConfig(getState))

        dispatch({
            type: QUESTION_REMOVED,
            payload: id
        })
    } catch (err) { }
}