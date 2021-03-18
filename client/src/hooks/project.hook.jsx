import React from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'

import environment from '../environment'

export const useProject = () => {
  const history = useHistory()

  const getAll = async () => {
    try {
      return await axios.get(`${environment.serverUrl}/api/project`)
    } catch (err) {
      history.push('/login')
      localStorage.clear()
      console.log('[GETALL_HOOK]', err)
    }
  }

  // const create = async () => {
  //   try {
  //     const {data} = await axios.post()
  //   } catch (err) {
  //     console.log('[CREATE_HOOK]', err)
  //   }
  // }

  return {
    getAll
  }
}