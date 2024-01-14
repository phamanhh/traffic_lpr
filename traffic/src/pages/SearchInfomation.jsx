import React, { useEffect, useRef, useState } from 'react'
import { useConvertBase64 } from '../hooks/useConvertBase64';
import { useDispatch, useSelector } from 'react-redux';
import { regImage, regVideo } from '../../thunk/imageThunk';
import { imageSelector } from '../redux/selector';
import Spinner from '../components/Spinner';
import { toast } from 'react-hot-toast'
import ImageResult from '../components/ImageResult';
import Toast from '../components/Toast';
import LoadingOverlayComp from '../components/LoadingOverlayComp';
import { useLocalStorage } from '../hooks/useLocalStorage';

const SearchInfomation = () => {
  const [selectImage, setSelectImage] = useState(null);
  const dispatch = useDispatch();
  const [loadingBtn, setLoadingBtn] = useState(false);
  const token = useLocalStorage('loginUser')[0].token;

  console.log('avc', token);

  const onSubmit = () => {
    if (!selectImage) {
      toast.error('Vui lòng chọn ảnh!')
      return;
    }

    setTimeout(() => {
      let formData = new FormData();
      formData.append('file', selectImage);
      formData.append('token', token);
      dispatch(regImage(formData));

    }, 2000)
    setLoadingBtn(true);
  }

  const imageResult = useSelector(imageSelector)?.result;
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (!imageResult) return;
    console.log(imageResult);
    if (imageResult.error) {
      toast.error('Dữ liệu không tìm thấy!');
      return;
    }
    setLoadingBtn(false);
    toast.success('Tìm dữ liệu thành công!');
    setSelectImage(null);
    setTimeout(() => {
      setShowResult(true);
    }, 1000)
  }, [imageResult])

  const [activeOverlay, setActiveOverlay] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setActiveOverlay(false)
    }, 1500)
  }, [])

  return (
    <div className="h-screen font-sans antialiased leading-normal tracking-wider text-gray-900 bg-cover animate-fade-right">
      <LoadingOverlayComp isActive={activeOverlay} />
      <ImageResult token={token} imageResult={imageResult} showResult={showResult} setShowResult={setShowResult} />
      <div className="flex flex-wrap items-center justify-center h-full mx-auto max-w-screen-2xl lg:h-full lg:my-0">
        <div id="profile" className="w-full mx-6 bg-white rounded-lg shadow-2xl lg:w-4/5 lg:mx-0">
          <div className="p-4 text-center md:p-12 lg:text-left">

            <div className="block w-48 h-48 mx-auto -mt-16 bg-center bg-cover rounded-full shadow-xl lg:hidden" style={{ backgroundImage: "url('https://source.unsplash.com/MP0IUfwrn0A')" }}></div>

            <h1 className="pt-8 text-3xl font-bold lg:pt-0">Tra cứu thông tin</h1>
            <div className="pt-3 mx-auto mb-4 border-b-2 border-green-500 opacity-25 lg:mx-0"></div>
            <div>
              <p className="flex items-center justify-center pt-4 text-base font-bold lg:justify-start">
                Tải ảnh hoặc video
              </p>
              <div className="flex items-center justify-center w-full h-full p-10">
                <label htmlFor="dropzone-file" className="flex flex-col items-center transition-all duration-150 ease-linear justify-center w-full h-[400px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  {selectImage ? <img className='object-contain object-top w-full h-full' src={URL.createObjectURL(selectImage)} /> :
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">JPG or PNG (MAX. 800x400px)</p>
                    </div>
                  }
                  <input webkitdirectory onChange={(e) => {
                    setSelectImage(e.target.files[0])
                  }} id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>
            </div>
            <div className="flex justify-end p-10 pt-12 pb-8">
              <button onClick={() => onSubmit()} className="bg-blue-700 w-[177px] transition-all duration-150 ease-linear hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-[3px]">
                {loadingBtn ? <Spinner /> : <span>Tìm kiếm thông tin</span>}

              </button>
            </div>
          </div>
        </div>
        {/* <div className="w-full lg:w-2/5">
          <img src="https://source.unsplash.com/MP0IUfwrn0A" className="hidden rounded-none shadow-2xl lg:rounded-lg lg:block" />
        </div> */}
      </div>
    </div>

  )
}

export default SearchInfomation