import {useCallback} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios' 

import {StorageNames} from '../storage-names'

import environment from '../environment'

export const useAuth = () => {
  const history = useHistory()

  const signUp = useCallback(async (email, password, name) => {
    try {
      await axios.post(`${environment.serverUrl}/api/sign-up`, {
        email, 
        password, 
        name
      })
      history.push('/login')
    } catch (err) {
      console.log('[SIGNUP_HOOK]: ', err)
    }
  }, [history])

  const login = useCallback(async (email, password) => {
    try {
      const {data} = await axios.post(`${environment.serverUrl}/api/login`, {
        email,
        password
      })
      localStorage.setItem(StorageNames.userInfo, JSON.stringify({
        name: data.name,
        email: data.email
      }))
      history.push('/')
    } catch (err) {
      console.log('[LOGIN_HOOK]', err)
    }
    localStorage.setItem(StorageNames.userToken, true)
  }, [history])

  const logout = useCallback(async () => {
    try {
      await axios.get(`${environment.serverUrl}/api/logout`)
      history.push('/login')
      localStorage.removeItem(StorageNames.userToken)
    } catch (err) {
      console.log('[LOGOUT_HOOK]: ', err)
    }
  }, [history])

  return {
    signUp,
    login,
    logout
  }
}