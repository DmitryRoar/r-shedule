import React, {useRef, useState} from 'react'
import classes from './CreateProject.module.scss'

import {useProject} from '../../hooks/project.hook'

import {Input} from '../Input/Input'
import {AddUser} from '../AddUser/AddUser'

import {StorageNames} from '../../storage-names'

export const CreateProject = ({setCreateState}) => {
  const nameRef = useRef(null)
  const descRef = useRef(null)
  const dateRef = useRef(null)

  const [countUsers, setCountUser] = useState([])

  const {create, getAll} = useProject()

  const closeCreateHandler = () => {
    setCreateState(false)
  }

  const addUserHandler = () => {
    setCountUser(prev => [...prev, prev.length])
    console.log('count: ', countUsers)
  }

  const removeInputHandler = (idx) => {
    console.log('idx: ', idx)
    localStorage.removeItem(`${StorageNames.userChildren}-${idx}`)
    setCountUser(prev => prev.filter(p => p !== idx))
  }

  const submitHandler = event => {
    event.preventDefault()

    const name = nameRef.current.value.trim()
    const desc = descRef.current.value.trim()
    const date = dateRef.current.value.trim()

    const storages = countUsers.map(userIdx => {
      return JSON.parse(localStorage.getItem(`${StorageNames.userChildren}-${userIdx}`))
    })

    create(name, desc, date, storages)
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
                countUsers.map((userIdx, idx) => (
                  <AddUser 
                    userIdx={userIdx} 
                    key={idx} 
                    onRemove={removeInputHandler}
                  />
                ))
              }
            </div>
          </div>

          <button 
            className={classes.CreateProjectButton}
            type="submit"
          >
            Создать проект
          </button>
        </div>
      </form>
    </>
  )
}