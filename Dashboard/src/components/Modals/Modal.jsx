import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { FaTimes } from 'react-icons/fa';

export default function Modal({ closeModal, isOpen, width, children, title }) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-300"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={`w-full ${
                    width ? width : 'max-w-4xl'
                  } transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] border border-slate-100 transition-all`}
                >
                  {title && (
                    <div className="w-full flex justify-between items-center px-5 py-3.5 border-b border-slate-100 bg-slate-50/50">
                      <Dialog.Title as="h3" className="text-base font-bold text-slate-800">
                        {title}
                      </Dialog.Title>
                      <button
                        onClick={closeModal}
                        className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors duration-200 flex items-center justify-center cursor-pointer"
                      >
                        <FaTimes className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                  <div className="p-4 sm:p-5">
                    {children}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
