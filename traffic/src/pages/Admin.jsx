import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom';
import Toast from '../components/Toast';

const Admin = () => {
  return (
    <div>
      <Sidebar />
      <div className='ml-[320px] h-screen'>
        <Toast />
        <Outlet />
      </div>
    </div>
  )
}

export default Admin