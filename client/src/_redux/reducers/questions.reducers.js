import { QUESTIONS_LOADED, QUESTIONS_LOADING, QUESTION_FAILED, QUESTIONS_FAILED, QUESTION_REMOVED } from "../types"

const initialState = {
    questions: [],
    isLoading: false,
    errors: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case QUESTIONS_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case QUESTIONS_LOADED:
            return {
                ...state,
                isLoading: false,
                questions: action.payload.questions
            }
        case QUESTIONS_FAILED:
        case QUESTION_FAILED:
            return {
                ...state,
                isLoading: false,
                questions: [],
                errors: action.payload.data
            }
        case QUESTION_REMOVED:
            return {
                ...state,
                questions: [...state.questions.filter(question => question.id !== +action.payload)]
            }
        default:
            return state
    }
}