import React, { useEffect, useState } from 'react'
import LoadingOverlayComp from '../components/LoadingOverlayComp'
import { useDispatch, useSelector } from 'react-redux'
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getListUsers } from '../../thunk/userThunk';
import { userSelector } from '../redux/selector';
import PaginationComp from '../components/PaginationComp';

const UsersManager = () => {
  const [activeOverlay, setActiveOverlay] = useState(true);
  const dispatch = useDispatch()
  const currentUser = useLocalStorage('loginUser')[0];

  useEffect(() => {

    setTimeout(() => {
      setActiveOverlay(false)
    }, 1000)
  }, [])

  const [page, setPage] = useState(1);
  const [role, setRole] = useState('user');

  const handleChange = (e) => {
    setActiveOverlay(true);
    setRole(e.target.value);
    setPage(1);
  }

  useEffect(() => {
    if (!page && !role) return;
    let user = {
      token: currentUser?.token,
      role: role,
      page: page
    }
    dispatch(getListUsers(user));
  }, [page, role])

  useEffect(() => {
    let user = {
      token: currentUser?.token,
      role: 'user',
      page: 1
    }
    dispatch(getListUsers(user))
  }, [])

  const users = useSelector(userSelector).users;

  useEffect(() => {
    if (!users) return;
    setTimeout(() => {
      setActiveOverlay(false);
    }, 1000)

  }, [users])


  return (
    <div className="h-screen font-sans antialiased leading-normal tracking-wider text-gray-900 bg-cover animate-fade-right">
      <LoadingOverlayComp isActive={activeOverlay} />
      <div className="flex flex-wrap items-center justify-center h-full max-w-screen-lg mx-auto lg:h-full lg:my-0">
        <div id="profile" className="w-full mx-6 bg-white rounded-lg shadow-2xl lg:w-4/5 lg:mx-0">
          <div className="p-4 text-center md:p-12 lg:text-left">

            <div className="block w-48 h-48 mx-auto -mt-16 bg-center bg-cover rounded-full shadow-xl lg:hidden" style={{ backgroundImage: "url('https://source.unsplash.com/MP0IUfwrn0A')" }}></div>

            <h1 className="pt-8 text-3xl font-bold lg:pt-0">Danh sách người dùng</h1>
            <div className="pt-3 mx-auto mb-4 border-b-2 border-green-500 opacity-25 lg:mx-0"></div>
            <div className='mt-2 mb-2'>
              <label>Chọn Role: </label>
              <select onChange={handleChange}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
              </select>
            </div>
            <table className="min-w-full max-h-[500] text-sm font-light text-left">
              <thead className="font-medium border-b dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-2">
                    STT
                  </th>
                  <th scope="col" className="px-6 py-2">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-2">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-2">

                  </th>
                </tr>
              </thead>
              <tbody>
                {users?.data?.map((item, index) => {
                  return (
                    <tr key={index} className="border-b dark:border-neutral-500">
                      <td className="px-6 py-2 font-medium whitespace-nowrap">{(page-1) * 10 +index + 1}</td>
                      <td className="px-6 py-2 whitespace-nowrap">{item.username}</td>
                      <td className="px-6 py-2 whitespace-nowrap">{item.role}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className='flex justify-center mt-10'>
              <PaginationComp total={users?.len} page={page} setPage={setPage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsersManager