import React, {useRef} from 'react'
import classes from '../Auth.module.scss'

import {useAuth} from '../../../hooks/auth.hook'

import {AuthLayout} from '../../../layouts/AuthLayout/AuthLayout'
import {Input} from '../../../components/Input/Input'

export const LoginPage = () => {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const {login, loginButtonDisabled} = useAuth()

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
        <Input text="Email" ref={emailRef} className={classes.Input} />
        <Input text="Пароль" ref={passwordRef} type="password" className={classes.Input} />
        <button 
          type="submit" 
          className={classes['Form__Submit']}
          disabled={loginButtonDisabled}
        >
          войти
        </button>
      </form>
    </AuthLayout>
  )
}