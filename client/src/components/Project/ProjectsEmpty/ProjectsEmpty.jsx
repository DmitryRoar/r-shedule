import React from 'react'
import classes from './ProjectsEmpty.module.scss'

export const ProjectsEmpty = ({openCreate}) => (
  <div className={classes.Project}>
    <div className={classes.ProjectEmpty}>
      <h3>У вас нет созданных проектов</h3>
      <button onClick={openCreate}>Создать проект</button>
    </div>
  </div>
)
