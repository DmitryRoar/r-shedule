import React from 'react'
import classes from './AuthLayout.module.scss'

import {NavLink} from 'react-router-dom'

export const AuthLayout = ({children}) => {
  return (
    <div className={classes.Wrap}>
      <div className={classes.Content}>
        <div className={classes.ChangePage}>
          <NavLink to="/login" activeClassName={classes.Active}>
            Войти
          </NavLink>
          <NavLink to="sign-up" activeClassName={classes.Active}>
            Регистрация
          </NavLink>
        </div>

        {children}
      </div>
    </div>
  )
}