import React from 'react'
import ReactDOM from 'react-dom'

import {Provider} from 'react-redux'
import store from './_redux/store'

import './styles/index.css'
import App from './components/App'

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)
