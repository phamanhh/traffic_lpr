import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Spinner from './Spinner';
import { useDispatch, useSelector } from 'react-redux'
import { changePassword } from '../../thunk/userThunk';
import { userSelector } from '../redux/selector';
import { toast } from 'react-hot-toast'
import { getResponseChangePassword } from '../redux/reducers/userSlice';
import UserInfoContext from '../context/UserInfoContext';

const ChangePasswordForm = () => {

  const userLogin = useContext(UserInfoContext);

  const dispatch = useDispatch()
  const { register, setValue, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: userLogin?.username,
      password: '',
      new_password: ''
    }
  })

  const reset = () => {
    setValue('new_password', '');
    setValue('password', '');
  }

  const [loadingBtn, setLoadingBtn] = useState(false);

  const onSubmit = (data) => {
    setLoadingBtn(true);
    setTimeout(() => {
      dispatch(changePassword(data))
    }, 2000)
  }

  const changePasswordResponse = useSelector(userSelector)?.changePasswordResponse;

  useEffect(() => {
    setLoadingBtn(false);
    if (!changePasswordResponse) return;
    if (changePasswordResponse?.message === 'Wrong password' && changePasswordResponse?.error) {
      toast.error('Đổi password không thành công!');
      return;
    }
    toast.success('Đổi password thành công');
    reset();
    setTimeout(() => {
      dispatch(getResponseChangePassword(null))
    }, 2000)
  }, [changePasswordResponse])

  return (
    <form>
      <div className="grid gap-y-4">
        <div>
          <label htmlFor="new_password" className="block mb-2 ml-1 text-xs font-semibold ">Current
            Password</label>
          <div className="relative">
            <input {...register('password', { required: true })} type="password" name='password'
              className={`${errors.password ? 'outline-red-500 ring-red-500 border-red-500' : 'outline-blue-500 border-gray-200'} block w-full px-4 py-3 text-sm border-2 rounded-md shadow-sm`}
              required ariaDescribedby="new-password-error"
              placeholder="Enter password" />
          </div>
          <p className="hidden mt-2 text-xs text-red-600" id="new-password-error">Please include a
            password that
            complies with the rules to ensure security</p>
        </div>
        <div className='mb-3'>
          <label htmlFor="confirmn_new_password"
            className="block mb-2 ml-1 text-xs font-semibold ">New Password</label>
          <div className="relative">
            <input {...register('new_password', { required: 'New Password is required' })} type="password" id="confirmn_new_password" name="new_password"
              className={`${errors.new_password ? 'outline-red-500 ring-red-500 border-red-500' : 'outline-blue-500 border-gray-200'} block w-full px-4 py-3 text-sm border-2  rounded-md shadow-sm`}
              required ariaDescribedby="confirmn_new-password-error"
              placeholder="Enter a new password" />
          </div>
          <p className="hidden mt-2 text-xs text-red-600" id="confirmn_new-password-error">Please
            include a password that
            complies with the rules to ensure security</p>
        </div>
        <button type="submit"
          onClick={handleSubmit(onSubmit)}
          className="inline-flex items-center outline-none justify-center gap-2 px-4 py-3 text-sm font-semibold text-white transition-all bg-blue-700 border border-transparent rounded-md hover:bg-blue-900 focus:outline-none">
          {loadingBtn ? <Spinner /> : <span>Reset my password</span>}
        </button>
      </div>
    </form>
  )
}

export default ChangePasswordForm