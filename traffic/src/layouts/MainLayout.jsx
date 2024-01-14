import React from 'react'
import Background from '../components/Background'
import { Outlet } from 'react-router-dom'
import Toast from '../components/Toast'

const MainLayout = () => {
  return (
    <>
      <Background />
      <Outlet />
      {/* <Toast /> */}
    </>
  )
}

export default MainLayout