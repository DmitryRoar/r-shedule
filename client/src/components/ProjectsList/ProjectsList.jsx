import React from 'react'
import classes from './ProjectsList.module.scss'

export const ProjectsList = ({projects, openCreate}) => {
  return (
    <div>
      <div className={classes.Headline}>
        <h1>Ваши проекты</h1>
        {
          projects.length > 0 && (
            <div className={classes.CreateProject}>
              <button onClick={openCreate} className={classes.CreateProject}>Создать проект</button>
            </div>
          ) 
        }
      </div> 
        {
          projects.length
      
          ? <div className={classes.ProjectsList}>
              {projects.map(project => (
              <div key={project.id}>

                <div key={project.id} className={classes.ListWrap}>
                  <div className={classes.List}>
                    <div className={classes.ListHeadline}>
                      <p>{project.name}</p>
                    </div>

                    <div className={classes.ListButtons}>
                      <button>Редактировать</button>
                    </div>
                    <div className={classes.ListButtons}>
                      <button>Перейти</button>
                    </div>
                  </div>
                </div>
              </div>
              ))}
            </div>
          : <>
              <div className={classes.Project}>
                <div className={classes.ProjectEmpty}>
                  <h3>У вас нет созданных проектов</h3>
                  <button onClick={openCreate}>Создать проект</button>
                </div>
              </div>
            </>
        }
    </div>
  )
}