import React from 'react'
import classes from './HomePage.module.scss'

import {HomeLayout} from "../../layouts/HomeLayout/HomeLayout"

export const HomePage = () => {
  return (
    <HomeLayout>
      <div className={classes.Wrap}>
        <div className={classes.Headline}>
          <h1>Ваши проекты</h1>
        </div>

        <div className={classes.Project}>
          <div className={classes.ProjectEmpty}>
            <h3>У вас нет созданных проектов</h3>
            <button>Создать проект</button>
          </div>
        </div>
      </div>
    </HomeLayout>
  )
}