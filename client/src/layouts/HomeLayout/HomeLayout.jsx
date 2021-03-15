import React from 'react'

import {Navbar} from '../../components/Navbar/Navbar'

export const HomeLayout = ({children}) => {
  return (
    <div>
      <Navbar />
      {/* {children} */}
    </div>
  )
}