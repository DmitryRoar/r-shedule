import React from 'react'
import classes from './ProjectsList.module.scss'

import {useHistory} from 'react-router-dom'

export const ProjectsList = ({projects}) => {
  const history = useHistory()

  const moveHandler = (id) => {
    history.push(`/project/${id}`)
  }

  const editHandler = (id) => {
    history.push(`/project/edit/${id}`)
  }

  return (
    <div className={classes.ProjectsList}>
      {projects.map(project => (
        <div key={project._id}>

          <div key={project.id} className={classes.ListWrap}>
            <div className={classes.List}>
              <div className={classes.ListHeadline}>
                <p>{project.name}</p>
              </div>

              <div className={classes.ListButtons}>
                <button onClick={editHandler.bind(null, project._id)}>Редактировать</button>
              </div>
              <div className={classes.ListButtons}>
                <button onClick={moveHandler.bind(null, project._id)}>Перейти</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
