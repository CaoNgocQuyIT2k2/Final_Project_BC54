import React from 'react'

import { Outlet } from 'react-router-dom'
import Headers from '../pages/Nav/Headers'

export default function HomeLayout() {
  return (
    <div>
        <Headers/>
        <Outlet/>
    </div>
  )
}
