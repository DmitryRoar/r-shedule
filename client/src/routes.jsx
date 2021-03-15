import {Switch, Route, Redirect} from 'react-router-dom'
import {PrivateRoute} from './components/PrivateRoute/PrivateRoute'

import {LoginPage} from './pages/Auth/Login/LoginPage'
import {SignUpPage} from './pages/Auth/SignUp/SignUpPage'
import {HomePage} from './pages/Home/HomePage'

export const Routes = isAuth => (
  <Switch>
    <Route path="/login" exact component={LoginPage} />
    <Route path="/sign-up" exact component={SignUpPage} />

    <PrivateRoute path="/" component={HomePage} auth={isAuth} />
  </Switch>
)