import React, { useEffect, useState } from 'react'
import '../assets/css/login.css'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../thunk/userThunk'
import Spinner from '../components/Spinner'
import Register from './Register'
import Toast from '../components/Toast'
import { userSelector } from '../redux/selector'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { getResponseLogin } from '../redux/reducers/userSlice'
import LoadingOverlayComp from '../components/LoadingOverlayComp'

const Login = () => {
  const dispatch = useDispatch();
  const { register,getValues, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: '', password: ''
    }
  });
  const navigate = useNavigate();
  const loginResponse = useSelector(userSelector)?.loginResponse;
  const [loadingBtn, setLoadingBtn] = useState(false);

  const onSubmit = (data) => {
    setLoadingBtn(true)
    setTimeout(() => {
      dispatch(login(data))
    }, 2000)
    setIsLogging(true);
  }

  const [activeOverlay, setActiveOverlay] = useState(false);
  const [isLoging, setIsLogging] = useState(false);

  const getPermission = (role) => {
    switch (role) {
      case 'admin':
        return [1, 6, 3, 0, 7]
      case 'user': 
        return [4, 3, 0, 7, 1]
      default:
        return [2, 5, 3, 0, 7]
    }
  }

  useEffect(() => {
    setLoadingBtn(false);
    setTimeout(() => {
      setIsLogging(false);
    }, 2500)
    if (!loginResponse) return;
    if (loginResponse.error) {
      toast.error('Đăng nhập thất bại! Vui lòng thử lại!', { duration: 2000 });
      dispatch(getResponseLogin(null))
      return
    }
    if (loginResponse.message === "Wrong password or user not found") {
      toast.error('Đăng nhập thất bại! Vui lòng thử lại!', { duration: 2000 });
      dispatch(getResponseLogin(null))
      return
    }

    let localStore = {...loginResponse?.data, permission: getPermission(loginResponse?.data.role)};

    // set localStorage
    localStorage.setItem('loginUser', JSON.stringify(localStore))

    // notify 
    toast.success('Đăng nhập thành công!', { duration: 2000 });
    // reset store
    dispatch(getResponseLogin(null))
    setActiveOverlay(true);
    setTimeout(() => {
      navigate('/admin')
    }, 2000)
  }, [loginResponse])

  const [isRegister, setRegister] = useState(false);

  return (
    <>
      {isRegister ? <Register setRegister={setRegister} /> : <div className="h-screen wrapper">
        <form className="login">
          <p className="text-red-500 title">Log in</p>
          <input {...register('username', { required: 'Username is required!' })} type="text" placeholder="Username" autoFocus />
          <i className="fa fa-user"></i>
          <input {...register('password', { required: 'Password is required!' })} type="password" placeholder="Password" />
          <i className="fa fa-key"></i>
          <p onClick={() => { if (isLoging) return; setRegister(true) }} className='underline inline-block text-[12px] text-blue-500 text-right cursor-pointer'>Register</p>
          <button onClick={handleSubmit(onSubmit)}>
            {loadingBtn ? <Spinner /> : <span className="state">Log in</span>}
          </button>
        </form>
      </div >}
      <Toast />
      <LoadingOverlayComp isActive={activeOverlay} />
    </>

  )
}

export default Login