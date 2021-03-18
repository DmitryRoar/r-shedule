import React, {useState, useEffect} from 'react'
import classes from './HomePage.module.scss'

import {useProject} from '../../hooks/project.hook'

import {HomeLayout} from "../../layouts/HomeLayout/HomeLayout"
import {CreateProject} from '../../components/CreateProject/CreateProject'
import {ProjectsList} from '../../components/ProjectsList/ProjectsList'

export const HomePage = () => {
  const [create, setCreate] = useState(false)  
  const {getAll} = useProject()

  let projects = [
    {
      name: 'first project test',
      desc: 'mock desk',
      date: '12.05.2012',
      id: Date.now() + Math.random()
    },
    {
      name: 'second project test',
      desc: 'mock desk',
      date: '22.05.2012',
      id: Date.now() + Math.random()
    },
    {
      name: 'third project test',
      desc: 'mock desk',
      date: '30.05.2012',
      id: Date.now() + Math.random()
    }
  ]

  useEffect(() => {
    getAll()
    // eslint-disable-next-line
  }, [])

  const openCreateHandler = () => {
    setCreate(true)
  }

  return (
    <HomeLayout>
      <div className={classes.Wrap}>
        {
          create
          ? <CreateProject setCreateState={setCreate} />
          : <ProjectsList projects={projects} openCreate={openCreateHandler} />
        }
      </div>
    </HomeLayout>
  )
}