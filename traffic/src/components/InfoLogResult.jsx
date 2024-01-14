import React, { useState, useEffect } from 'react'
import PaginationComp from './PaginationComp';
import { logInfo } from '../../thunk/imageThunk';
import {useDispatch} from 'react-redux'

const InfoLogResult = ({ logInfoResult, time, token, vidId, reset }) => {
  const dispatch = useDispatch()
  const infos = logInfoResult?.data?.list;

  const [page, setPage] = useState(1);

  const isOk = <div className="inline-flex items-center px-3 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60">
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 3L4.5 8.5L2 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <h2 className="text-sm font-normal">OK</h2>
  </div>

  const isNotOk = <div className="inline-flex items-center px-3 py-1 text-red-500 rounded-full gap-x-2 bg-red-100/60">
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

    <h2 className="text-sm font-normal">Too Fast</h2>
  </div>

useEffect(()=> {reset && setPage(1)}, [reset])

  useEffect(() => {
    if(!page) return;
    let data = {
      vid_id: vidId, token, page
    }
    console.log("dispatch");
    dispatch(logInfo(data))

    
  }, [page])

  return (
    <div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <h3 className='text-[18px] bg-red-500 text-white px-4 py-2 rounded-[4px] inline-block'>Số lượng phương tiện: {logInfoResult?.data?.count}</h3>
              <table className="min-w-full text-sm font-light text-left">
                <thead className="font-medium border-b dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-2">
                      STT
                    </th>
                    <th scope="col" className="px-6 py-2">
                      Image
                    </th>
                    <th scope="col" className="px-6 py-2">
                      Speed
                    </th>
                    <th scope="col" className="px-6 py-2">
                      Plate
                    </th>
                    <th scope="col" className="px-6 py-2">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-2">

                    </th>
                  </tr>
                </thead>
                <tbody>
                  {infos?.map((item, index) => {
                    return (
                      <tr key={index} className="border-b dark:border-neutral-500">
                        <td className="px-6 font-medium whitespace-nowrap">{(page-1) * 10 +index + 1}</td>
                        <td className="px-6 whitespace-nowrap"><img className='w-[100px] h-[70px] rounded-[3px] object-fill' src={`data:image/jpg;base64, ${item.image}`} alt="" /></td>
                        <td className="px-6 whitespace-nowrap">{item.speed.toFixed(2)}</td>
                        <td className="px-6 whitespace-nowrap">{item.plate}</td>
                        <td className="px-6 whitespace-nowrap">{time}</td>
                        <td className="px-6 whitespace-nowrap">{item.speeding ? isNotOk : isOk}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-center'>

    <PaginationComp total={logInfoResult?.data?.len} page={page} setPage={setPage}  />
      </div>
    </div>
  )
}

export default InfoLogResult