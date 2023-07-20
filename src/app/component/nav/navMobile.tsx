import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Navigation } from '../../../../constants';
import classNames from '@/app/library/helper';

interface NavMobileProps {
   sidebarOpen: boolean;
   setSidebarOpen: (value?: boolean) => void;
}

const NavMobile = ({ sidebarOpen, setSidebarOpen }: NavMobileProps) => {
   return (
      <Transition.Root show={sidebarOpen} as={Fragment}>
         <Dialog as='div' className='relative z-50 lg:hidden' onClose={setSidebarOpen}>
            <Transition.Child
               as={Fragment}
               enter='transition-opacity ease-in-out duration-300'
               enterFrom='opacity-0'
               enterTo='opacity-100'
               leave='transition-opacity ease-in-out duration-300'
               leaveFrom='opacity-100'
               leaveTo='opacity-0'
            >
               <div className='fixed inset-0 bg-gray-800/80' />
            </Transition.Child>

            <div className='fixed inset-0 flex'>
               <Transition.Child
                  as={Fragment}
                  enter='transition ease-in-out duration-300 transform'
                  enterFrom='-translate-x-full'
                  enterTo='translate-x-0'
                  leave='transition ease-in-out duration-300 transform'
                  leaveFrom='translate-x-0'
                  leaveTo='-translate-x-full'
               >
                  <Dialog.Panel className='relative mr-16 flex w-full max-w-xs flex-1'>
                     {/* Sidebar component, swap this element with another sidebar if you like */}
                     <div className='flex grow flex-col gap-y-2 overflow-y-auto bg-slate-100 dark:bg-slate-800 px-6 pb-4'>
                        <div className='flex h-14 items-center'>
                           <button
                              type='button'
                              className='-m-2.5 -m2.5 p-2.5 hover:rounded-full hover:bg-gray-300/30 '
                              onClick={() => setSidebarOpen(false)}
                           >
                              <span className='sr-only'>Close sidebar</span>
                              <XMarkIcon
                                 className='h-6 w-6 text-black dark:text-white hover:scale-105'
                                 aria-hidden='true'
                              />
                           </button>
                        </div>
                        <nav className='flex flex-1 flex-col'>
                           <ul role='list' className='flex flex-1 flex-col gap-y-4'>
                              <li>
                                 <ul role='list' className='-mx-2 space-y-2'>
                                    {Navigation.map((item) => (
                                       <li key={item.name}>
                                          <a
                                             href={item.href}
                                             className={classNames(
                                                item.current
                                                   ? 'bg-sky-200 dark:bg-blue-500'
                                                   : 'text-gray-700 hover:bg-gray-300/30',
                                                'group flex gap-x-3 rounded-2xl p-3 text-md leading-6 font-medium dark:text-gray-200'
                                             )}
                                          >
                                             <span className='text-sm font-light tracking-tight'>
                                                {item.num}{' '}
                                             </span>
                                             {item.name}
                                          </a>
                                       </li>
                                    ))}
                                 </ul>
                              </li>
                              <li className='mt-auto'>
                                 <span>Dark Mode</span>
                              </li>
                           </ul>
                        </nav>
                     </div>
                  </Dialog.Panel>
               </Transition.Child>
            </div>
         </Dialog>
      </Transition.Root>
   );
};
