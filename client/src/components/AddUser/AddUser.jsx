import React, {useEffect, useState} from 'react'
import classes from './AddUser.module.scss'

import {Input} from '../Input/Input'

import {StorageNames} from '../../storage-names'

export const AddUser = ({onRemove, userIdx}) => {
  const [email, setEmail] = useState('')
  const [rule, setRule] = useState('')

  useEffect(() => {
    localStorage.setItem(`${StorageNames.userChildren}-${userIdx}`, JSON.stringify({
      email, rule
    }))
  }, [email, rule])

  return (
    <div className={classes.Wrap} >
      <Input 
        text="Email" 
        onChange={v => setEmail(v.target.value)}
        value={email}
        className={classes.Input}
       />
      <Input 
        text="Роль в проекте" 
        className={classes.Input}
        value={rule} 
        onChange={v => setRule(v.target.value)}
      />
      <button 
        className={classes.Remove}
        type="button"
        onClick={() => onRemove(userIdx)}
      >
        Удалить
      </button>
    </div>
  )
}