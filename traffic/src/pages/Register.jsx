import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { signUp } from '../../thunk/userThunk';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../redux/selector';
import Spinner from '../components/Spinner';
import { getResponseRegister } from '../redux/reducers/userSlice';
import toast from 'react-hot-toast';

const Register = ({ setRegister }) => {
  const dispatch = useDispatch();
  const registerResponse = useSelector(userSelector)?.registerResponse;
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      username: '', password: '', rePassword: '', role: '',
    }
  });

  const [loadingBtn, setLoadingBtn] = useState(false);

  const onSubmit = (data) => {
    if (data.role.trim() === '') {
      toast.error('Vui lòng chọn role!')
      return;
    }

    setLoadingBtn(true);
    let user = {
      username: data.username,
      password: data.password,
      role: data.role
    }
    console.log(data);
    setTimeout(() => {
      dispatch(signUp(user))
    }, 2000)
  }

  useEffect(() => {
    setLoadingBtn(false);
    if (!registerResponse) return;
    if (registerResponse?.message === 'Username already exists') {
      toast.error('Đăng kí thất bại! Vui lòng thử lại!')
      dispatch(getResponseRegister(null))
      return;
    }
    setTimeout(() => {
      dispatch(getResponseRegister(null))
    }, 150)
    setTimeout(() => {
      setRegister(false);
    }, 2000)
    toast.success('Đăng kí thành công');
  }, [registerResponse])

  const validateRePassword = (val) => {
    if (watch('password') != val) {
      return "Your re-passwords do no match";
    }
  }
  return (
    <div>
      <div className="h-screen wrapper">
        <form className="login">
          <p className="text-red-500 title">Register</p>
          <input {...register('username', { required: 'Username is required!' })} type="text" placeholder="Username" autoFocus />
          <i className="fa fa-user"></i>
          <input {...register('password', { required: 'Password is required!' })} type="password" placeholder="Password" />
          <i className="fa fa-key"></i>
          <input className='border-red-500' {...register('rePassword', {
            required: 'Re-Password is required!', validate: validateRePassword,
          })} type="password" placeholder="Re-Password" />
          <i className="fa fa-key"></i>
          <select {...register('role')} name="role" id="">
            <option value="">Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="manager">QLGT</option>
          </select>
          <p onClick={() => setRegister(false)} className='underline text-[12px] text-blue-500 text-right cursor-pointer'>Login</p>
          <button onClick={handleSubmit(onSubmit)}>
            {loadingBtn ? <Spinner /> : <span className="state">Register</span>}
          </button>
        </form>
      </div >
    </div>
  )
}

export default Register