import React, { useEffect, useState } from 'react'
import SocialMedia from '../components/SocialMedia'
import ChangePasswordModal from '../components/ChangePasswordModal';
import LoadingOverlayComp from '../components/LoadingOverlayComp';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { UserContextProvider } from '../context/UserInfoContext';


const UserInfo = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setActiveOverlay(false)
    }, 1500)
  }, [])

  const userLogin = useLocalStorage('loginUser')[0];

  return (
    <UserContextProvider value={userLogin}>
      <div className="font-sans antialiased leading-normal tracking-wider text-gray-900 bg-cover animate-fade-right">
        <LoadingOverlayComp isActive={activeOverlay} />
        <div className="max-w-screen-2xl flex items-center translate-y-[-50px] justify-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
          <div id="profile" className="w-full mx-6 bg-white rounded-lg shadow-2xl lg:w-4/5 lg:mx-0">
            <div className="p-4 text-center md:p-12 lg:text-left">

              <div className="block w-48 h-48 mx-auto -mt-16 bg-center bg-cover rounded-full shadow-xl lg:hidden" style={{ backgroundImage: "url('https://source.unsplash.com/MP0IUfwrn0A')" }}></div>

              <h1 className="pt-8 text-3xl font-bold lg:pt-0">User</h1>
              <div className="pt-3 mx-auto border-b-2 border-green-500 opacity-25 lg:mx-0"></div>
              <p className="flex items-center justify-center pt-4 text-base font-bold lg:justify-start">
                <svg className='mr-2 text-green-700' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" fill="none" stroke="green" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
                </svg>
                {userLogin?.username}
              </p>
              <p className="flex items-center justify-center pt-2 text-xs text-gray-600 lg:text-sm lg:justify-start">
                <svg className='mr-2 text-green-700' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" fill="none" stroke="green" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                *******
              </p>
              <p className="pt-8 text-base">Welcome to Traffic, Let's check the information!</p>

              <div className="flex justify-end pt-12 pb-8">
                <button onClick={() => setIsOpenModal(true)} className="px-4 py-2 font-bold text-white transition-all duration-150 ease-linear bg-blue-700 rounded-full hover:bg-blue-900">
                  Change Password
                </button>
              </div>

              <SocialMedia />
              <ChangePasswordModal isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
            </div>

          </div>
        </div>
      </div>
    </UserContextProvider>

  )
}

export default UserInfo