import React, { useEffect, useState } from 'react'
import LoadingOverlayComp from '../components/LoadingOverlayComp'
import { useLocalStorage } from '../hooks/useLocalStorage';

const Welcome = () => {
  const [activeOverlay, setActiveOverlay] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setActiveOverlay(false)
    }, 2000)
  },[])

  const currentUser = useLocalStorage('loginUser')[0];

  return (
    <div className="h-screen font-sans antialiased leading-normal tracking-wider text-gray-900 bg-cover animate-fade-right">
      <LoadingOverlayComp isActive={activeOverlay} />
      <div className="flex flex-wrap items-center justify-center h-full max-w-screen-xl mx-auto lg:h-full lg:my-0">
        <div id="profile" className="w-full mx-6 bg-white rounded-lg shadow-2xl lg:w-4/5 lg:mx-0">
          <div className="p-4 text-center md:p-12 lg:text-left">

            <div className="block w-48 h-48 mx-auto -mt-16 bg-center bg-cover rounded-full shadow-xl lg:hidden" style={{ backgroundImage: "url('https://source.unsplash.com/MP0IUfwrn0A')" }}></div>

            <h1 className="pt-8 text-3xl font-bold lg:pt-0">Welcome <span className='text-red-500'>{currentUser.username}</span> to Traffic App</h1>
            <div className="pt-3 mx-auto mb-4 border-b-2 border-green-500 opacity-25 lg:mx-0"></div>
            <img className='rounded-[10px]' src="https://hips.hearstapps.com/roadandtrack/assets/16/39/1475251666-00-lead-gettyimages-523821065.jpg" alt="" />
          </div>

        </div>
      </div>
    </div>
  )
}

export default Welcome