import React, { useEffect, useState } from 'react'
import Toast from '../components/Toast'
import Spinner from '../components/Spinner'
import LoadingOverlayComp from '../components/LoadingOverlayComp'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { getViolationStatistic } from '../../thunk/imageThunk'
import { imageSelector } from '../redux/selector'
import { getViolationDate } from '../redux/reducers/imageSlice'
import ViolationStatisticResult from '../components/ViolationStatisticResult'

const ViolationStatistic = () => {
  const dispatch = useDispatch();
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState(true);
  const token = useLocalStorage('loginUser')[0].token;
  const [date, setDate] = useState();

  const [showViolationResult, setShowViolationResult] = useState(false);

  const onChange = (e) => {
    let value = e.target.value;
    setDate(value)
  }

  useEffect(() => {
    setTimeout(() => {
      setActiveOverlay(false);
    }, 2000)
  }, [])

  const [reset, setReset] = useState(false);


  const onSubmit = () => {
    if (!date) {
      toast.error('Vui lòng điền đúng định dạng ngày!');
      return;
    }
    if (date.trim() === '') {
      toast.error('Vui lòng điền đúng định dạng ngày!');
      return;
    }
    setLoadingBtn(true);
    let data = {
      date, token, page: 1
    }
    setReset(true);
    setTimeout(() => {
      setReset(false)
    }, 150)
    setTimeout(() => {
      dispatch(getViolationStatistic(data))
    }, 2000)
  }
  const violationResult = useSelector(imageSelector).violationDate;

  useEffect(() => {
    if (!violationResult) return;
    setLoadingBtn(false);
    console.log(violationResult);
    if (violationResult?.data?.length === 0) {
      toast.error('Không tìm thấy vi phạm!')
      setTimeout(() => {
        dispatch(getViolationDate(null))
      }, 2000)
      return;
    }

    setShowViolationResult(true);

  }, [violationResult])

  return (
    <div className="h-screen font-sans antialiased leading-normal tracking-wider text-gray-900 bg-cover animate-fade-right">
      <LoadingOverlayComp isActive={activeOverlay} />
      <ViolationStatisticResult date={date} token={token} showViolationResult={showViolationResult} setShowViolationResult={setShowViolationResult} violation={violationResult} />
      <div className="flex flex-wrap items-center justify-center h-full max-w-screen-lg mx-auto lg:h-full lg:my-0">
        <div id="profile" className="w-full mx-6 bg-white rounded-lg shadow-2xl lg:w-4/5 lg:mx-0">
          <div className="p-4 text-center md:p-12 lg:text-left">

            <div className="block w-48 h-48 mx-auto -mt-16 bg-center bg-cover rounded-full shadow-xl lg:hidden" style={{ backgroundImage: "url('https://source.unsplash.com/MP0IUfwrn0A')" }}></div>

            <h1 className="pt-8 text-3xl font-bold lg:pt-0">Thống kê vi phạm</h1>
            <div className="pt-3 mx-auto mb-4 border-b-2 border-green-500 opacity-25 lg:mx-0"></div>
            <h2 className='mb-5 text-[20px]'>Nhập ngày:</h2>

            <input className='px-4 py-2 border-blue-500 border-[1px]' onChange={onChange} type="date" />

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

export default ViolationStatistic