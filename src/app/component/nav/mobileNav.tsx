import { Fragment, SetStateAction, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Navigation } from '@/app/constants';
import classNames from 'classnames';

const MobileNavigation = () => {
   const [sidebarOpen, setSidebarOpen] = useState(false);

   return (
      <>
         <MobileNavBar setSidebarOpen={setSidebarOpen} />
         <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog as='div' className='relative z-50 md:hidden w-full' onClose={setSidebarOpen}>
               <Transition.Child
                  as={Fragment}
                  enter='transition-opacity ease-in-out duration-300'
                  enterFrom='opacity-0'
                  enterTo='opacity-100'
                  leave='transition-opacity ease-in-out duration-300'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
               >
                  <div className='fixed inset-0 bg-gray-200/40' />
               </Transition.Child>

               <div className='w-full fixed inset-0 flex flex-row-reverse z-50'>
                  <Transition.Child
                     as={Fragment}
                     enter='transition ease-in-out duration-300 transform'
                     enterFrom='translate-x-full'
                     enterTo='translate-x-0'
                     leave='transition ease-in-out duration-300 transform'
                     leaveFrom='translate-x-0'
                     leaveTo='translate-x-full'
                  >
                     <Dialog.Panel className='relative flex w-full max-w-[14rem] flex-1'>
                        {/* Sidebar component */}
                        <div className='flex flex-grow flex-col gap-y-3 overflow-y-hidden bg-[#f2f0f0] dark:bg-slate-800 lg:bg-transparent px-6 pb-5'>
                           <div className='flex flex-row-reverse h-14 items-center'>
                              <button
                                 className='-m-2.5 p-2.5 hover:rounded-full hover:bg-gray-300/30 '
                                 onClick={() => setSidebarOpen(false)}
                              >
                                 <span className='sr-only'>Close sidebar</span>
                                 <XMarkIcon
                                    className='h-6 w-6 text-black dark:text-white hover:scale-105'
                                    aria-hidden='true'
                                 />
                              </button>
                           </div>
                           <nav className='flex flex-1 flex-col items-center justify-center'>
                              <ul role='list' className='flex flex-col mt-8 space-y-2 text-center'>
                                 {Navigation.map((item) => (
                                    <li
                                       className='inline-flex justify-start items-start mt-auto w-full text-center align-middle self-center'
                                       key={item.name}
                                    >
                                       <a
                                          href={item.href}
                                          className={classNames(
                                             // item.current
                                             //    ? 'bg-sky-200 dark:bg-blue-500'
                                             'text-gray-700 hover:bg-gray-300/30',
                                             'text-center group flex gap-x-3 p-4 leading-6 font-medium dark:text-gray-200'
                                          )}
                                       >
                                          <span className='font-serif text-lg text-center tracking-tight'>
                                             {item.name}
                                          </span>
                                       </a>
                                    </li>
                                 ))}
                              </ul>
                              <ul className='mt-auto text-center'>
                                 <span>Made with care by Paul Cho</span>
                              </ul>
                           </nav>
                        </div>
                     </Dialog.Panel>
                  </Transition.Child>
               </div>
            </Dialog>
         </Transition.Root>
      </>
   );
};

const MobileNavBar = ({
   setSidebarOpen,
}: {
   setSidebarOpen: (value: SetStateAction<boolean>) => void;
}) => {
   return (
      <div
         className={classNames(
            // isTop ? 'h-16' : 'top-0 h-16 z-50',
            'z-40 md:h-0 fixed transition-all duration-250 ease-in flex flex-1 w-full justify-end items-center px-6'
         )}
      >
         <div className='h-14 md:hidden inline-flex items-center'>
            <button
               type='button'
               className='w-10 h-10 -m-1.5 pl-2 hover:rounded-full hover:bg-gray-300/30'
               onClick={() => setSidebarOpen(true)}
            >
               <span className='sr-only'>Open sidebar</span>
               <Bars3Icon
                  className='w-6 h-6  text-black dark:text-white hover:scale-105'
                  aria-hidden='true'
               />
            </button>
         </div>
      </div>
   );
};

export default MobileNavigation;
