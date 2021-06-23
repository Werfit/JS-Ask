import { Switch, Route, Redirect } from 'react-router-dom'

import Authentication from 'components/pages/Authentication'
import NewQuestion from 'components/pages/NewQuestion'
import Profile from 'components/pages/Profile'
import Home from 'components/pages/Home'
import Loader from 'components/common/Loader'
import Search from 'components/pages/Search'
import Settings from 'components/pages/Settings'
import ChangePassword from 'components/pages/ChangePassword'

export default ({ isAuthenticated, isLoading, token }) => {
    if (isLoading || (token && !isAuthenticated))
        return (
            <Switch>
                <Route path="/" component={Loader} />
            </Switch>
        )

    if (isAuthenticated)
        return (
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/profile/" exact component={Profile} />
                <Route path="/questions/:target/" exact component={NewQuestion} />
                <Route path="/search/" exact component={Search} />
                <Route path="/settings/" exact component={Settings} />
                <Route path="/change/" exact component={ChangePassword} />

                <Redirect to="/" />
            </Switch>
        )

    return (
        <Switch>
            <Route path="/authentication/" exact component={Authentication} />
            <Route path="/questions/:target/" exact component={NewQuestion} />
            <Route path="/search/" exact component={Search} />
            <Redirect to="/authentication/" />
        </Switch>
    )
}