import React from 'react'
import { features } from '../helpers/constant'
import SidebarFeature from './SidebarFeature'
import { Link, useLocation } from 'react-router-dom'
import { useLocalStorage } from '../hooks/useLocalStorage'

const Sidebar = () => {
  const location = useLocation();

  const currentUser = useLocalStorage('loginUser')[0];

  const activeLocation = (link) => {
    if(link === location.pathname) {
      return true;
    }
    return false;
  }
  return (
    <div className=" fixed top-0 flex flex-col bg-clip-border bg-white text-gray-700 h-[calc(100vh)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="p-4 mb-2">
        <img className='w-[250px] m-auto' src="https://img.freepik.com/premium-vector/blue-white-logo-traffic-light-with-red-light_695276-2503.jpg" alt="" />
        <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-gray-900">Traffic</h5>
      </div>
      <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
        {features.map((feature, index) => {
          return <SidebarFeature activeLocation={activeLocation} key={index} feature={feature} user={currentUser} />;
        })}
        <Link to={"/"} role="button" tabindex="0" className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none mt-36 text-start hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900">
          <div className="grid mr-4 place-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden={'true'} className="w-5 h-5">
              <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z" clip-rule="evenodd"></path>
            </svg>
          </div>Đăng xuất
        </Link>
      </nav>
    </div>
  )
}

export default Sidebar