import {Route, Switch} from 'react-router-dom'
import {PrivateRoute} from './components/PrivateRoute/PrivateRoute'

import {LoginPage} from './pages/Auth/Login/LoginPage'
import {SignUpPage} from './pages/Auth/SignUp/SignUpPage'
// private route
import {HomePage} from './pages/Home/HomePage'
import {ProjectPage} from './pages/Project/Project/ProjectPage'
import {ProjectEditPage} from './pages/Project/ProjectEdit/ProjectEditPage'

export const Routes = isAuth => (
  <Switch>
    <Route path="/login" exact component={LoginPage}/>
    <Route path="/sign-up" exact component={SignUpPage}/>

    <PrivateRoute path="/project/:id" exact component={ProjectPage} auth={isAuth}/>
    <PrivateRoute path="/project/edit/:id" exact component={ProjectEditPage} auth={isAuth}/>
    <PrivateRoute path="/" exact component={HomePage} auth={isAuth}/>
  </Switch>
)
