import React from 'react'

const ImgLog = ({ logs }) => {
  return (
    <div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <div className='w-1/2 p-10 mx-auto shadow-md border-[#ccc]'>
                <h3>Số lượng phương tiện: {logs?.length}</h3>
                <table className="text-sm font-light text-left ">
                  <thead className="font-medium border-b dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        STT
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Plate
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs?.map((item, index) => {
                      return (
                        <tr className="border-b dark:border-neutral-500">
                          <td width={'10%'} className="px-6 py-4 font-medium whitespace-nowrap">{index + 1}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{item.plate}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImgLog