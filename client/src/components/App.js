import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import useRoutes from 'hooks/useRoutes.hooks'

import { loadUser } from '_redux/actions/accounts.actions'

const App = () => {
    const { isAuthenticated, isLoading, token } = useSelector(state => state.accounts)
    const routes = useRoutes({ isAuthenticated, isLoading, token })

    const dsp = useDispatch()

    useEffect(() => dsp(loadUser()), [])

    return (
        <BrowserRouter>
            {routes}
        </BrowserRouter>
    )
}

export default App;
