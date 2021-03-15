import React, {useRef} from 'react'
import classes from '../Auth.module.scss'

import {useAuth} from '../../../hooks/auth.hook'

import {AuthLayout} from '../../../layouts/AuthLayout/AuthLayout'
import {AuthInput} from '../../../components/AuthInput/AuthInput'

export const LoginPage = () => {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const {login} = useAuth()

  const submitHandler = event => {
    event.preventDefault()

    const email = emailRef.current.value
    const password = passwordRef.current.value

    login(email, password)
  }

  return (
    <AuthLayout>
      <form 
        className={classes.Form}
        onSubmit={submitHandler}
      >
        <AuthInput text="Email" ref={emailRef} />
        <AuthInput text="Пароль" ref={passwordRef} type="password" />
        <button type="submit" className={classes['Form__Submit']}>войти</button>
      </form>
    </AuthLayout>
  )
}