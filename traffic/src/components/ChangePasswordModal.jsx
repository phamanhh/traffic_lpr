import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import ChangePasswordForm from './ChangePasswordForm'
import Toast from './Toast'

export default function ChangePasswordModal({ isOpen, setIsOpen }) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
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
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-10 text-left align-middle shadow-xl transition-all">
                  <div className="mt-2">
                    <button onClick={() => setIsOpen(false)} className="absolute top-0 right-0 m-5 p-2 rounded-full transition-all duration-150 ease-linear hover:bg-slate-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                    <div class="bg-white mt-7 rounded-xl">
                      <div class="text-center">
                        <h1 class="block text-lg font-bold text-gray-800">Reset Password</h1>
                      </div>

                      <div class="mt-5">
                        <ChangePasswordForm />
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <Toast />
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
