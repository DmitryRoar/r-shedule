import {useState, useCallback} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios' 

import {StorageNames} from '../storage-names'

import environment from '../environment'

export const useAuth = () => {
  const history = useHistory()
  const [loginButtonDisabled, setLoginButtonDisabled] = useState(false)
  const [signUpButtonDisabled, setSignUpButtonDisabled] = useState(false)

  const signUp = useCallback(async (email, password, name) => {
    try {
      setSignUpButtonDisabled(true)
      await axios.post(`${environment.serverUrl}/api/auth/sign-up`, {
        email, 
        password, 
        name
      })
      history.push('/login')
    } catch (err) {
      setSignUpButtonDisabled(false)
      console.log('[SIGNUP_HOOK]: ', err)
    }
  }, [history])

  const login = useCallback(async (email, password) => {
    try {
      setLoginButtonDisabled(true)
      const {data} = await axios.post(`${environment.serverUrl}/api/auth/login`, {
        email,
        password
      }, {
        withCredentials: true
      })
      localStorage.setItem(StorageNames.userInfo, JSON.stringify({
        name: data.name,
        email: data.email
      }))
      localStorage.setItem(StorageNames.userToken, true)
      history.push('/')
    } catch (err) {
      setLoginButtonDisabled(false)
      console.log('[LOGIN_HOOK]', err)
    }
  }, [history])

  const logout = useCallback(async () => {
    try {
      await axios.get(`${environment.serverUrl}/api/auth/logout`)
      history.push('/login')
      localStorage.clear()
    } catch (err) {
      console.log('[LOGOUT_HOOK]: ', err)
    }
  }, [history])

  return {
    signUp,
    login,
    logout,
    loginButtonDisabled,
    signUpButtonDisabled
  }
}