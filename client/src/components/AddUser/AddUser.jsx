import React, {useRef} from 'react'
import classes from './AddUser.module.scss'

import {Input} from '../Input/Input'

export const AddUser = ({setCountUser}) => {
  const emailRef = useRef(null) 
  const ruleRef = useRef(null) 

  const removeInputHandler = () => {
    setCountUser(prev => prev - 1)
  }

  return (
    <div className={classes.Wrap} >
      <Input 
        text="Email" 
        type="email" 
        ref={emailRef} 
        className={classes.Input}
       />
      <Input 
        text="Роль в проекте" 
        className={classes.Input} 
        ref={ruleRef}
      />
      <button 
        className={classes.Remove}
        onClick={removeInputHandler}
      >
        Удалить
      </button>
    </div>
  )
}