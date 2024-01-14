import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useDispatch } from 'react-redux'
import { getViolation } from '../redux/reducers/imageSlice';
import PaginationComp from './PaginationComp';
import { getViolationInfo } from '../../thunk/imageThunk';

const PlateViolationResult = ({ showViolationResult, setShowViolationResult, violations, token, plate,reset }) => {
  const dispatch = useDispatch();
  // console.log(page, setPage);
  const [page, setPage] = useState(1);

  const closeModal = () => {
    setShowViolationResult(false);
    dispatch(getViolation(null))
  }

  useEffect(()=> {reset && setPage(1)}, [reset])

  useEffect(() => {
    if (!page) return;
    if (!token) return;
    if (!plate) return;
   
    let data = {
      plate,
      page,
      token
    }
  
    dispatch(getViolationInfo(data))
  },[page])

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
                    className="text-[20px] font-bold leading-6 text-gray-900 pb-5 border-b-[blue] border-b-[1px] mb-5"
                  >
                    Kết quả
                  </Dialog.Title>
                  <table className="min-w-full max-h-[500px] text-sm font-light text-left">
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
                      {violations?.data?.map((item, index) => {
                        return (
                          <tr key={index} className="border-b dark:border-neutral-500">
                            <td className="px-6 py-2 font-medium whitespace-nowrap">{(page-1) * 10 +index + 1}</td>
                            <td className="px-6 py-2 whitespace-nowrap"><img className='w-[100px] h-[50px] rounded-[3px] object-full' src={`data:image/jpg;base64, ${item.image}`} alt="" /></td>
                            <td className="px-6 py-2 whitespace-nowrap">{item.speed.toFixed(2)}</td>
                            <td className="px-6 py-2 whitespace-nowrap">{item.plate}</td>
                            <td className="px-6 py-2 whitespace-nowrap">{item.date}</td>
                            {/* <td className="px-6 py-4 whitespace-nowrap">{item.speeding ? isNotOk : isOk}</td> */}
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                  <div className='flex justify-center mt-2'>
                  <PaginationComp total={violations?.len} page={page} setPage={setPage} />

                  </div>
                  <div className='flex justify-end mt-5 '><button className='bg-red-500 hover:bg-red-700 transition-all ease-in duration-150 py-2 px-4 text-white rounded-[5px]' onClick={closeModal}>Close</button></div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

export default PlateViolationResult







// import { Fragment, useEffect, useState } from 'react'
// import { Dialog, Transition } from '@headlessui/react'
// import { useDispatch } from 'react-redux'
// import { getViolation } from '../redux/reducers/imageSlice';

// const PlateViolationResult = ({ showViolationResult, setShowViolationResult, violations }) => {
//   const dispatch = useDispatch();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);

//   const closeModal = () => {
//     setShowViolationResult(false);
//     dispatch(getViolation(null));
//     setCurrentPage(1); // Reset trang khi đóng modal
//   }

//   // Tính toán chỉ số bắt đầu và kết thúc của danh sách hiện tại dựa trên trang hiện tại và kích thước trang
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = violations.slice(indexOfFirstItem, indexOfLastItem);

//   // Tính tổng số trang
//   const totalItems = violations.length;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   // Hàm chuyển trang
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div>
//       <Transition appear show={showViolationResult} as={Fragment}>
//         <Dialog as="div" className="relative z-10" onClose={closeModal}>
//           {/* ... */}
//           <div className="fixed inset-0 overflow-y-auto">
//             <div className="flex items-center justify-center min-h-full p-4 text-center">
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
//                   <table className="min-w-full max-h-[500px] text-sm font-light text-left">
//                     {/* ... */}
//                     <tbody>
//                       {currentItems.map((item, index) => {
//                         return (
//                           <tr key={index} className="border-b dark:border-neutral-500">
//                             {/* ... */}
//                           </tr>
//                         )
//                       })}
//                     </tbody>
//                   </table>
//                   <div className="flex justify-between items-center mt-5">
//                     <div className="text-sm text-gray-700">
//                       Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalItems)} of {totalItems} entries
//                     </div>
//                     <div className="flex space-x-2">
//                       {/* Tạo các nút phân trang */}
//                       {Array.from({ length: totalPages }, (_, index) => (
//                         <button
//                           key={index}
//                           onClick={() => paginate(index + 1)}
//                           className={`text-sm py-1 px-3 focus:outline-none ${
//                             currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
//                           }`}
//                         >
//                           {index + 1}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                   <div className='flex justify-end mt-5 '>
//                     <button className='bg-red-500 hover:bg-red-700 transition-all ease-in duration-150 py-2 px-4 text-white rounded-[5px]' onClick={closeModal}>
//                       Close
//                     </button>
//                   </div>
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </Dialog>
//       </Transition>
//     </div>
//   );
// }

// export default PlateViolationResult;

