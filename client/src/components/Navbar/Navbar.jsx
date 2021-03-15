import React, {useState, useEffect} from 'react'
import classes from './Navbar.module.scss'

import {NavLink} from 'react-router-dom'

import {useAuth} from '../../hooks/auth.hook'

import {StorageNames} from '../../storage-names'

export const Navbar = () => {
  const [user, setUser] = useState({
    name: '',
    email: ''
  })
  const {logout} = useAuth()

  useEffect(() => {
    const {name, email} = JSON.parse(localStorage.getItem(StorageNames.userInfo))
    setUser({name, email})
  }, [])

  return (
    <header className={classes.Header}>
      <div className={classes.Logout}>
        <NavLink 
          to="/login"
          onClick={logout}
        >
          <i className='fas fa-arrow-left' />
        </NavLink>
      </div>
      <div className={classes.User}>
        <span>{user.name ? user.name : 'name'}</span>
        <span>{user.email ? user.email : 'email'}</span>
      </div>
    </header>
  )
}