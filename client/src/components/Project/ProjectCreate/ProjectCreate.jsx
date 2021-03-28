import React, {useEffect, useRef, useState} from 'react'
import classes from './ProjectCreate.module.scss'

import {useProject} from '../../../hooks/project.hook'

import {Input} from '../../Input/Input'
import {AddUser} from '../AddUser/AddUser'

export const ProjectCreate = ({submitText, setCreateState}) => {
  const nameRef = useRef(null)
  const descRef = useRef(null)
  const dateRef = useRef(null)

  const [users, setUsers] = useState([])

  const {create, getAll, getEmails} = useProject()
  const [emails, setEmails] = useState([])

  useEffect(() => {
    ;(async () => {
      setEmails(await getEmails())
    })()
  }, [])

  const editUser = (idx, data) => {
    setUsers(prev => {
      const prevVal = prev[idx]
      return prev
        .slice(0, idx)
        .concat([{ ...prevVal, ...data }].concat(prev.slice(idx + 1)))
    })
  }

  const closeCreateHandler = () => {
    setCreateState(false)
  }

  const addUserHandler = () => {
    setUsers(prev => [...prev, {email: '', rule: ''}])
  }

  const removeInputHandler = (idx) => {
    setUsers(prev => [...prev.slice(0, idx), ...prev.slice(idx + 1)])
  }

  const submitHandler = event => {
    event.preventDefault()

    const name = nameRef.current.value.trim()
    const desc = descRef.current.value.trim()
    const date = dateRef.current.value.trim()

    create(name, desc, date, users)
    closeCreateHandler()
    getAll()
  }

  return (
    <>
      <div className={classes.Overlay} onClick={closeCreateHandler}/>
      <form className={classes.Wrap} onSubmit={submitHandler}>
        <div className={classes.Headline}>
          <h1>Создать проект (доску)</h1>
        </div>
        <div 
          className={`${classes.Inputs} ${classes.Column}`}
        >
          <Input 
            text="Название проекта" 
            ref={nameRef} 
            className={classes.Input} 
          /> 
          <Input 
            text="Описание проекта" 
            ref={descRef} 
            className={classes.Input} 
          /> 
          <Input 
            text="Примерная дата окончания проекта" 
            ref={dateRef} 
            type="date"
            className={classes.Input} 
          /> 
        </div>

        <div className={classes.AddUserButton}>
          <button type="button" onClick={addUserHandler}>Добавить пользователя</button>
        </div>

        <div className={classes.AddUser}>
          <div className={classes.AddUserWrap}>
            <div className={classes.InputsColumn}>
              {
                users.map((user, idx) => (
                  <AddUser 
                    userIdx={idx} 
                    key={idx}
                    userEmails={emails}
                    onRemove={removeInputHandler}
                    email={user.email}
                    rule={user.rule}
                    setEmail={(email) => editUser(idx, { email })}
                    setRule={(rule) => editUser(idx, { rule })}
                  />
                ))
              }
            </div>
          </div>

          <button 
            className={classes.CreateProjectButton}
            type="submit"
          >
            {submitText}
          </button>
        </div>
      </form>
    </>
  )
}
