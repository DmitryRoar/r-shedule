import React, {useState} from 'react'
import classes from './HomePage.module.scss'

import {HomeLayout} from "../../layouts/HomeLayout/HomeLayout"
import {CreateProject} from '../../components/CreateProject/CreateProject'
import {ProjectsList} from '../../components/ProjectsList/ProjectsList'

export const HomePage = () => {
  const [create, setCreate] = useState(false)

  const openCreateHandler = () => {
    setCreate(true)
  }

  return (
    <HomeLayout>
      <div className={classes.Wrap}>
        {
          create
          ? <CreateProject setCreateState={setCreate} />
          : <ProjectsList openCreate={openCreateHandler} />
        }
      </div>
    </HomeLayout>
  )
}