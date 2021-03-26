import React, {useEffect, useState} from 'react'
import classes from './Projects.module.scss'

import {useProject} from '../../../hooks/project.hook'

import {Loader} from '../../Loader/Loader'
import {ProjectsList} from '../ProjectsList/ProjectsList'
import {ProjectsEmpty} from '../ProjectsEmpty/ProjectsEmpty'

export const Projects = ({openCreate}) => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  const {getAll} = useProject()

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const response = await getAll()
        setProjects(response)
        setLoading(false)
      } catch (err) {
        setLoading(false)
        console.log('[PROJECTLIST_EFFECT]: ', err)
      }
    })()
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      {
        loading
          ? <Loader />
          : <>
            <div className={classes.Headline}>
              <h1>Ваши проекты</h1>
              {
                projects.length > 0 && (
                  <div className={classes.CreateProject}>
                    <button
                      onClick={openCreate}
                      className={classes.CreateProject}
                    >
                      Создать проект
                    </button>
                  </div>
                )
              }
            </div>
            {
              projects.length
              ? <ProjectsList projects={projects} />
              : <ProjectsEmpty openCreate={openCreate} />
            }
          </>
      }
    </div>
  )
}
