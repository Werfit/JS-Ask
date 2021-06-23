import { combineReducers } from 'redux'

import accounts from './accounts.reducers'
import questions from './questions.reducers'
import search from './search.reducers'
import profile from './profile.reducers'

export default combineReducers({
    accounts, questions, search, profile
})