import React, {useState} from 'react'
import classes from './HomePage.module.scss'

import {HomeLayout} from "../../layouts/HomeLayout/HomeLayout"
import {ProjectCreate} from '../../components/Project/ProjectCreate/ProjectCreate'
import {Projects} from '../../components/Project/Projects/Projects'

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
          ? <ProjectCreate setCreateState={setCreate} />
          : <Projects openCreate={openCreateHandler} />
        }
      </div>
    </HomeLayout>
  )
}
