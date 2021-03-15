import React, {useRef} from 'react'
import classes from '../Auth.module.scss'

import {useAuth} from '../../../hooks/auth.hook'

import {AuthLayout} from '../../../layouts/AuthLayout/AuthLayout'
import {AuthInput} from '../../../components/AuthInput/AuthInput'

export const SignUpPage = () => {
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const {signUp} = useAuth()

  const submitHandler = event => {
    event.preventDefault()

    const name = nameRef.current.value
    const email = emailRef.current.value
    const password = passwordRef.current.value

    signUp(email, password, name)
  }

  return (
    <AuthLayout>
      <form 
        className={classes.Form}
        onSubmit={submitHandler}
      >
        <AuthInput text="Никнейм" ref={nameRef} />
        <AuthInput text="Email" ref={emailRef} />
        <AuthInput text="Пароль" ref={passwordRef} type="password" />

        <button type="submit" className={classes['Form__Submit']}>Зарегестрироваться</button>
      </form>
    </AuthLayout>
  )
}