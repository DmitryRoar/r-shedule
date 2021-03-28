import React from 'react'
import classes from './AddUser.module.scss'

import {Input} from '../../Input/Input'

export const AddUser = ({
                          email,
                          rule,
                          setEmail,
                          setRule,
                          onRemove,
                          userIdx,
                          userEmails
                        }) => {
  return (
    <div className={classes.Wrap}>
      <div className={classes.temp}>
        <Input
          text="Email"
          onChange={v => setEmail(v.target.value)}
          value={email}
          className={classes.Input}
        />
        <div>
          <select>
            {userEmails.map(e => (
              <option>{e.email}</option>
            ))}
          </select>
        </div>
      </div>

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
