import React, {useRef} from 'react'
import classes from '../Auth.module.scss'

import {useAuth} from '../../../hooks/auth.hook'

import {AuthLayout} from '../../../layouts/AuthLayout/AuthLayout'
import {Input} from '../../../components/Input/Input'

export const SignUpPage = () => {
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const {signUp, signUpButtonDisabled} = useAuth()

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
        <Input text="Никнейм" ref={nameRef} className={classes.Input} />
        <Input text="Email" ref={emailRef} className={classes.Input} />
        <Input text="Пароль" ref={passwordRef} type="password" className={classes.Input} />

        <button 
          type="submit"
          className={classes['Form__Submit']}
          disabled={signUpButtonDisabled}
        >
          Зарегестрироваться
        </button>
      </form>
    </AuthLayout>
  )
}