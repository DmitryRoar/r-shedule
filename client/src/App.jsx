import React from 'react'
import './App.scss'

import {Routes} from './routes'

import {StorageNames} from './storage-names'

function App() {
  const route = Routes(!!localStorage.getItem(StorageNames.userToken))
  console.log('localStorage: ', !!localStorage.getItem(StorageNames.userToken))

  return (
    <div>
      {route}
    </div>
  )
}

export default App
