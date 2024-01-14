import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const SidebarFeature = ({ feature, activeLocation, user }) => {
  const navigate = useNavigate()
  const handleClick = () => {
    let userPermisson = user.permission;
    if(userPermisson.includes(feature.id)) {
      navigate(feature.link)
      return
    } 
    toast.error('Không có quyền!')
  }

  return (
    <div onClick={handleClick} role="button" tabIndex="0" className={`flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 ${activeLocation(feature.link) ? 'text-blue-900 bg-blue-50 active:bg-gray-50 active:bg-opacity-80 active:text-blue-900 hover:text-blue-900 focus:text-blue-900 ' : ''}  outline-none`}>
      <div className="grid mr-4 place-items-center">
        {feature.icon}
      </div>
      {feature.name}
    </div>
  )
}

export default SidebarFeature