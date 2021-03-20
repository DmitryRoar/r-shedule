import React, {useRef, useState} from 'react'
import classes from './CreateProject.module.scss'

import {Input} from '../Input/Input'
import {AddUser} from '../AddUser/AddUser'

export const CreateProject = ({setCreateState}) => {
  const nameRef = useRef(null)
  const descRef = useRef(null)
  const dateRef = useRef(null)

  const [countUsers, setCountUser] = useState(0)
  const countUsersArr = Array.from({length: countUsers}).fill('')

  const closeCreateHandler = () => {
    setCreateState(false)
  }

  const addUserHandler = () => {
    setCountUser(prev => prev + 1)
  }

  const submitHandler = event => {
    event.preventDefault()

    const name = nameRef.current.value
    const desc = descRef.current.value
    const date = dateRef.current.value

    console.log(name)
    console.log(desc)
    console.log(date)
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
          <button onClick={addUserHandler}>Добавить пользователя</button>
        </div>

        <div className={classes.AddUser}>
          <div className={classes.AddUserWrap}>
            <div className={classes.InputsColumn}>
              {
                countUsersArr.map((_, idx) => (
                  <AddUser 
                    id={idx} 
                    key={idx} 
                    setCountUser={setCountUser} 
                    countUsersArr={countUsersArr}
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