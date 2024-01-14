import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useDispatch } from 'react-redux'
import { getViolationDate } from '../redux/reducers/imageSlice';
import PaginationComp from './PaginationComp';
import { getViolationStatistic } from '../../thunk/imageThunk';

const ViolationStatisticResult = ({ showViolationResult, setShowViolationResult, violation, date, token, reset }) => {
  const dispatch = useDispatch();
  const closeModal = () => {
    setShowViolationResult(false);
    dispatch(getViolationDate(null))
  }

  const [page, setPage] = useState(1);

  useEffect(()=> {reset && setPage(1)}, [reset])

  useEffect(() => {
    if(!page) return;
    let data = {
      date, token, page
    }
    dispatch(getViolationStatistic(data))
  }, [page])
  
  return (
    <div>
      <Transition appear show={showViolationResult} as={Fragment}>
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
                    className="text-[20px] font-bold leading-6 text-gray-900 pb-5 border-b-[blue] border-b-[1px]"
                  >
                    Kết quả
                  </Dialog.Title>
                  <table className="min-w-full text-sm font-light text-left">
                    <thead className="font-medium border-b dark:border-neutral-500">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          STT
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Image
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Speed
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Plate
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-4">

                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {violation?.data?.map((item, index) => {
                        return (
                          <tr key={index} className="border-b dark:border-neutral-500">
                            <td className="px-6 font-medium whitespace-nowrap">{(page-1) * 10 +index + 1}</td>
                            <td className="px-6 whitespace-nowrap"><img className='w-[100px] h-[50px] rounded-[3px] object-full' src={`data:image/jpg;base64, ${item.image}`} alt="" /></td>
                            <td className="px-6 whitespace-nowrap">{item.speed.toFixed(2)}</td>
                            <td className="px-6 whitespace-nowrap">{item.plate}</td>
                            <td className="px-6 whitespace-nowrap">{item.date}</td>
                            {/* <td className="px-6 py-4 whitespace-nowrap">{item.speeding ? isNotOk : isOk}</td> */}
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                  <div className='flex justify-center mt-5'>
                    <PaginationComp total={violation?.len} page={page} setPage={setPage} />
                  </div>
                  <div className='flex justify-end '><button className='bg-red-500 mt-3 hover:bg-red-700 transition-all ease-in duration-150 py-2 px-4 text-white rounded-[5px]' onClick={closeModal}>Close</button></div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

export default ViolationStatisticResult