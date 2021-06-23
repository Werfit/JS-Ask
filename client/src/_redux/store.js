import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import RootReducer from './reducers'

const middlewareList = [thunk]

// Production build excludes developer tools
const appliedMiddleware = applyMiddleware(...middlewareList)
const nodeEnv = process.env.NODE_ENV
const enhancer = nodeEnv === 'development' ?
    composeWithDevTools(appliedMiddleware) : appliedMiddleware

const store = createStore(
    RootReducer, enhancer
)

export default store