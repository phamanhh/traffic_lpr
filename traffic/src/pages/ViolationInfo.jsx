import React, { useEffect, useRef, useState } from 'react'
import LoadingOverlayComp from '../components/LoadingOverlayComp'
import Spinner from '../components/Spinner';
import Toast from '../components/Toast';
import toast from 'react-hot-toast'
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useDispatch, useSelector } from 'react-redux'
import { getViolationInfo } from '../../thunk/imageThunk';
import { imageSelector } from '../redux/selector';
import { getViolation } from '../redux/reducers/imageSlice';
import PlateViolationResult from '../components/PlateViolationResult';

const ViolationInfo = () => {
  const dispatch = useDispatch();
  const [activeOverlay, setActiveOverlay] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [plate, setPlate] = useState({
    input1: '',
    input2: '',
  });

  const [showViolationResult, setShowViolationResult] = useState(false);
  const token = useLocalStorage('loginUser')[0].token;

  const input1Ref = useRef(null);
  const input2Ref = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setActiveOverlay(false);
    }, 1000)
  }, [])

  const handleChangeInput1 = (e) => {
    let value = e.target.value;

    if (value.length === 3) {
      input2Ref.current.focus()
    }

    setPlate({ ...plate, input1: value })
  }

  const handleChangeInput2 = (e) => {
    let value = e.target.value;
    if (value.trim() === '') {
      input1Ref.current.focus();
    }
    setPlate({ ...plate, input2: value })
  }

  const [newInput, setNewInput] = useState('')

  const handleChange = (e) => {
    setNewInput(e.target.value)
  }
  const [reset, setReset] = useState(false);

  const onSubmit = () => {
    if (newInput.trim() === '') {
      toast.error('Vui lòng điền đúng định dạng biển số!');
      return;
    }
    setLoadingBtn(true);
    let data = {
      token: token,
      page: 1,
      plate: newInput
    }
    setReset(true)
    setTimeout(() => {
setReset(false)
    },150)
    setTimeout(() => {
      dispatch(getViolationInfo(data));
    }, 2000)
  }

  

  const violation = useSelector(imageSelector).violation;

  useEffect(() => {
    if (!violation) return;
    setLoadingBtn(false);
    console.log(violation);
    if (!violation.data || violation.data.length === 0) {
      toast.error('Không tìm thấy dữ liệu!')
      setTimeout(() => {
        dispatch(getViolation(null))
      }, 2000)
      return;
    }
    setShowViolationResult(true);

  }, [violation])

  return (
    <div className="h-screen font-sans antialiased leading-normal tracking-wider text-gray-900 bg-cover animate-fade-right">
      <LoadingOverlayComp isActive={activeOverlay} />
      <PlateViolationResult reset={reset} token={token} plate={newInput} showViolationResult={showViolationResult} setShowViolationResult={setShowViolationResult} violations={violation} />
      <div className="flex flex-wrap items-center justify-center h-full max-w-screen-lg mx-auto lg:h-full lg:my-0">
        <div id="profile" className="w-full mx-6 bg-white rounded-lg shadow-2xl lg:w-4/5 lg:mx-0">
          <div className="p-4 text-center md:p-12 lg:text-left">

            <div className="block w-48 h-48 mx-auto -mt-16 bg-center bg-cover rounded-full shadow-xl lg:hidden" style={{ backgroundImage: "url('https://source.unsplash.com/MP0IUfwrn0A')" }}></div>

            <h1 className="pt-8 text-3xl font-bold lg:pt-0">Tra cứu thông tin vi phạm</h1>
            <div className="pt-3 mx-auto mb-4 border-b-2 border-green-500 opacity-25 lg:mx-0"></div>
            <h2 className='mb-5 text-[20px]'>Nhập thông tin biển số</h2>

            <div className='text-center'>
              <input className='border-[1px] px-5 text-[28px] border-blue-500 rounded-md px-4 py-4' type="text" onChange={handleChange} />
            </div>
            <div className="flex justify-end p-10 pt-12 pb-8">
              <button onClick={() => onSubmit()} className="bg-blue-700 w-[177px] transition-all duration-150 ease-linear hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-[3px]">
                {loadingBtn ? <Spinner /> : <span>Tìm kiếm thông tin</span>}

              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViolationInfo