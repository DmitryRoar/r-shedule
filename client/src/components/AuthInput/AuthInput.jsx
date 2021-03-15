import React from 'react'
import classes from './AuthInput.module.scss'

export const AuthInput = React.forwardRef(({text, type = 'text'}, ref) => (
    <div className={classes.Input}>
      <label>{text}</label>
      <input type={type} ref={ref} />
    </div>
))