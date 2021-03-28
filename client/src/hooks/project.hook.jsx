import {useHistory} from 'react-router-dom'
import axios from 'axios'

import {serverUrl} from '../environment'

export const useProject = () => {
  const history = useHistory()

  const getAll = async () => {
    try {
      const {data} = await axios.get(`${serverUrl}/api/project`, {withCredentials: true})
      return data
    } catch (err) {
      history.push('/login')
      localStorage.clear()
      console.log('[GETALL_HOOK]', err)
    }
  }

  const getEmails = async () => {
    try {
      const {data} = await axios.get(`${serverUrl}/api/project/emails`, {withCredentials: true})
      return data
    } catch (err) {
      console.log('[GETEMAILS_HOOK]', err)
    }
  }

  const create = async (name, desc, date, users) => {
    try {
      return await axios.post(`${serverUrl}/api/project/create`, {
        name,
        desc,
        date,
        users
      }, {withCredentials: true})
    } catch (err) {
      console.log('[CREATE_HOOK]', err)
    }
  }

  return {
    getAll,
    create,
    getEmails
  }
}
