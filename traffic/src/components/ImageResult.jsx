import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPostImageResult } from '../redux/reducers/imageSlice';
import { logInfo } from '../../thunk/imageThunk';
import { imageSelector } from '../redux/selector';
import InfoLogResult from './InfoLogResult';
import ImgLog from './ImgLog';

const ImageResult = ({ showResult, setShowResult, imageResult, videoType, token }) => {
  const dispatch = useDispatch();
  const closeModal = () => {
    setShowResult(false);
    dispatch(getPostImageResult(null))
  }

  const [showLogResult, setShowLogResult] = useState();
  const [time, setTime] = useState(null);


  const timeRender = () => {
    const date = new Date().toLocaleDateString('en-GB');
    const time = new Date().toLocaleTimeString();
    return date + ' ' + time;
  }
  const [reset, setReset] = useState(false);
  const handleSubmit = () => {
    let videoId = imageResult.data.video_id;
    let page = 1;
    let test = { vid_id: videoId, token, page }
    dispatch(logInfo(test))
    window.open(imageResult.data.cloudPath, '_blank');
    setShowLogResult(true);
    setTime(timeRender())
    setReset(true)
    setTimeout(() => {
      setReset(false)
          },150)
  }

  const logInfoResult = useSelector(imageSelector).info;

  console.log(logInfoResult);

  return (
    <>
      <Transition appear show={showResult} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[1200px] h-full transform overflow-hidden rounded-[5px] bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-[20px] font-bold leading-6 text-gray-900 pb-5 border-b-[blue] border-b-[1px] mb-5"
                  >
                    Kết quả
                  </Dialog.Title>
                  {imageResult &&
                    <div className={`${videoType ? 'overflow-y-scroll overflow-x-hidden h-[650px] mb-10' : ''}`}>
                      <div className={`${videoType ? 'h-[200px]' : ''} w-full flex justify-center items-center mb-2`}>
                        {(videoType ? (<div className='flex flex-col items-center justify-center'>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            height="150px"
                            width="150px"
                            version="1.1"
                            id="Layer_1"
                            viewBox="0 0 512 512"
                            xmlSpace="preserve"
                            className='mb-5'
                          >
                            <path
                              style={{ fill: "#88C5CC" }}
                              d="M256,0C114.616,0,0,114.616,0,256s114.616,256,256,256s256-114.616,256-256S397.384,0,256,0z"
                            />
                            <path
                              style={{ fill: "#F5F5F5" }}
                              d="M204,84h176c4.4,0,8,3.6,8,8v328c0,4.4-3.6,8-8,8H132c-4.4,0-8-3.6-8-8V168L204,84z"
                            />
                            <path
                              style={{ fill: "#E6E6E6" }}
                              d="M196,168c4.4,0,8-3.6,8-8V84l-80,84H196z"
                            />
                            <circle style={{ fill: "#E16B5A" }} cx={256} cy={272} r={72} />
                            <path
                              style={{ fill: "#F5F5F5" }}
                              d="M239.472,241.984C237.564,240.892,236,241.8,236,244v56c0,2.2,1.564,3.108,3.472,2.016l49.056-28.032  c1.916-1.092,1.916-2.876,0-3.968L239.472,241.984z"
                            />
                          </svg>
                          <button onClick={handleSubmit} className='px-2 py-2 bg-red-500 text-[#fff] rounded-lg hover:scale-105'>
                            Tải xuống video và xem kết quả
                          </button>
                        </div>) : (<img src={'data:image/jpg;base64,' + imageResult.data} className="rounded-[10px] border w-full object-contain lg:rounded-lg h-full shadow-sm hidden lg:block" />))
                        }
                      </div>

                      <div className='mb-10'>
                        {/* {showLogResult ? <InfoLogResult logInfoResult={logInfoResult} time={time} /> : <ImgLog logs={imageResult?.log} />} */}
                        {showLogResult && <InfoLogResult reset={reset} token={token} vidId={imageResult?.data?.video_id} logInfoResult={logInfoResult} time={time} />}
                      </div>
                    </div>
                  }
                  <div className='flex justify-end '><button className='bg-red-500 hover:bg-red-700 transition-all ease-in duration-150 py-2 px-4 text-white rounded-[5px]' onClick={closeModal}>Close</button></div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default ImageResult



// import { Dialog, Transition } from '@headlessui/react'
// import { Fragment, useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { getPostImageResult } from '../redux/reducers/imageSlice';
// import { logInfo } from '../../thunk/imageThunk';
// import { imageSelector } from '../redux/selector';
// import InfoLogResult from './InfoLogResult';
// import ImgLog from './ImgLog';

// const ImageResult = ({ showResult, setShowResult, imageResult, videoType, token }) => {
//   const dispatch = useDispatch();
//   const closeModal = () => {
//     setShowResult(false);
//     dispatch(getPostImageResult(null))
//   }

//   const [showLogResult, setShowLogResult] = useState();
//   const [time, setTime] = useState(null);


//   const timeRender = () => {
//     const date = new Date().toLocaleDateString('en-GB');
//     const time = new Date().toLocaleTimeString();
//     return date + ' ' + time;
//   }
//   const [reset, setReset] = useState(false);
//   const handleSubmit = () => {
//     let videoId = imageResult.data.video_id;
//     let page = 1;
//     let test = { vid_id: videoId, token, page }
//     dispatch(logInfo(test))
//     window.open(imageResult.data.cloudPath, '_blank');
//     setShowLogResult(true);
//     setTime(timeRender())
//     setReset(true)
//     setTimeout(() => {
//       setReset(false)
//           },150)
//   }

//   const logInfoResult = useSelector(imageSelector).info;

//   console.log(logInfoResult);

//   return (
//     <>
//       <Transition appear show={showResult} as={Fragment}>
//         <Dialog as="div" className="relative z-10" onClose={closeModal}>
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-black/25" />
//           </Transition.Child>

//           <div className="fixed inset-0 overflow-y-auto">
//             <div className="flex h-full items-center justify-center min-h-full p-4 text-center">
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 scale-95"
//                 enterTo="opacity-100 scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 scale-100"
//                 leaveTo="opacity-0 scale-95"
//               >
//                 <Dialog.Panel className="w-full max-w-[1200px] h-full transform overflow-hidden rounded-[5px] bg-white p-6 text-left align-middle shadow-xl transition-all">
//                   <Dialog.Title
//                     as="h3"
//                     className="text-[20px] font-bold leading-6 text-gray-900 pb-5 border-b-[blue] border-b-[1px] mb-5"
//                   >
//                     Result
//                   </Dialog.Title>
//                   {imageResult &&
//                     <div className={`${videoType ? 'overflow-y-scroll overflow-x-hidden h-[650px] mb-10' : ''}`}>
//                       <div className={`${videoType ? 'h-full' : ''} w-full flex justify-center items-center mb-2`}>
//                         {(videoType ? (<div className='flex flex-col items-center justify-center'>
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             xmlnsXlink="http://www.w3.org/1999/xlink"
//                             height="80px"
//                             width="80px"
//                             version="1.1"
//                             id="Layer_1"
//                             viewBox="0 0 512 512"
//                             xmlSpace="preserve"
//                             className='mb-5'
//                           >
//                             <path
//                               style={{ fill: "#88C5CC" }}
//                               d="M256,0C114.616,0,0,114.616,0,256s114.616,256,256,256s256-114.616,256-256S397.384,0,256,0z"
//                             />
//                             <path
//                               style={{ fill: "#F5F5F5" }}
//                               d="M204,84h176c4.4,0,8,3.6,8,8v328c0,4.4-3.6,8-8,8H132c-4.4,0-8-3.6-8-8V168L204,84z"
//                             />
//                             <path
//                               style={{ fill: "#E6E6E6" }}
//                               d="M196,168c4.4,0,8-3.6,8-8V84l-80,84H196z"
//                             />
//                             <circle style={{ fill: "#E16B5A" }} cx={256} cy={272} r={72} />
//                             <path
//                               style={{ fill: "#F5F5F5" }}
//                               d="M239.472,241.984C237.564,240.892,236,241.8,236,244v56c0,2.2,1.564,3.108,3.472,2.016l49.056-28.032  c1.916-1.092,1.916-2.876,0-3.968L239.472,241.984z"
//                             />
//                           </svg>
//                           <button onClick={handleSubmit} className='px-2 bg-red-500 text-[#fff] rounded-lg hover:scale-105'>
//                             Tải xuống video và xem kết quả
//                           </button>
//                         </div>) : (<img src={'data:image/jpg;base64,' + imageResult.data} className="rounded-[10px] border w-full object-contain lg:rounded-lg h-full shadow-sm hidden lg:block" />))
//                         }
//                       </div>

//                       <div className='mb-10'>
//                         {/* {showLogResult ? <InfoLogResult logInfoResult={logInfoResult} time={time} /> : <ImgLog logs={imageResult?.log} />} */}
//                         {showLogResult && <InfoLogResult reset={reset} token={token} vidId={imageResult?.data?.video_id} logInfoResult={logInfoResult} time={time} />}
//                       </div>
//                     </div>
//                   }
//                   <div className='flex justify-end '><button className='bg-red-500 hover:bg-red-700 transition-all ease-in duration-150 py-2 px-4 text-white rounded-[5px]' onClick={closeModal}>Close</button></div>
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </Dialog>
//       </Transition>
//     </>
//   )
// }

// export default ImageResult