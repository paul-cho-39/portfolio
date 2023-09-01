import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import classNames from '@/library/helper';
import { useScrollDirection } from '@/library/hooks/useScrollDirection';
import { Divider } from '../divider';

const navigation = [
   { name: 'home', href: '#', num: '01.', current: true },
   { name: 'about', href: '#', num: '02.', current: false },
   { name: 'projects', href: '#', num: '03.', current: false },
   { name: 'contact', href: '#', num: '04.', current: false },
];

// here h-16 / top-16 is the breakpoint for header and main section
// should set this as constant so its easier to fix(?)

const Navbar = () => {
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const { scrollDirection, isTop } = useScrollDirection();

   return (
      <header className={classNames(isTop ? 'bg-[#184888]' : 'bg-transparent')}>
         <div className='w-full'>
            {/* mobile version */}
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
                        <Dialog.Panel className='relative flex w-full max-w-[22rem] flex-1'>
                           {/* Sidebar component, swap this element with another sidebar if you like */}
                           <div className='flex flex-grow flex-col gap-y-3 overflow-y-hidden bg-[#f2f0f0] dark:bg-slate-800 lg:bg-transparent px-6 pb-5'>
                              <div className='flex flex-row-reverse h-14 items-center'>
                                 <button
                                    type='button'
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
                              <nav className='flex flex-1 flex-col'>
                                 <ul
                                    role='list'
                                    className='flex flex-1 flex-col items-center justify-center gap-y-6'
                                 >
                                    <li>
                                       <ul role='list' className='mt-8 -mx-2 space-y-2'>
                                          {navigation.map((item) => (
                                             <li key={item.name}>
                                                <a
                                                   href={item.href}
                                                   className={classNames(
                                                      // item.current
                                                      //    ? 'bg-sky-200 dark:bg-blue-500'
                                                      'text-gray-700 hover:bg-gray-300/30',
                                                      'group flex gap-x-3 rounded-2xl p-4 text-md leading-6 font-medium dark:text-gray-200'
                                                   )}
                                                >
                                                   <span className='font-serif text-lg tracking-tight'>
                                                      {item.name}
                                                   </span>
                                                </a>
                                             </li>
                                          ))}
                                       </ul>
                                    </li>
                                    <li className='mt-auto'>
                                       <span>Made with ♡ by Paul Cho</span>
                                    </li>
                                 </ul>
                              </nav>
                           </div>
                        </Dialog.Panel>
                     </Transition.Child>
                  </div>
               </Dialog>
            </Transition.Root>

            {/* desktop version */}
            <div className='hidden mx-auto md:h-16 md:flex md:w-full'>
               <div className='flex flex-row justify-stretch items-stretch w-full h-full'>
                  <div className='fixed z-20 h-16'>
                     <div className='h-full inline-flex items-center justify-center px-6'>Logo</div>
                  </div>
                  <div className='flex flex-row items-end justify-end w-full h-full bg-transparent'>
                     <nav
                        role='navigation'
                        className={classNames(
                           isTop
                              ? 'h-16 bg-transparent' // opacty bg-blur
                              : 'h-16 z-50',
                           'z-20 bg-transparent fixed transition-all duration-250 ease-in px-10'
                        )}
                     >
                        <ul
                           role='list'
                           className='flex flex-row items-center justify-center gap-x-1 h-full'
                        >
                           {navigation.map((item, index) => (
                              <li className='' key={item.name}>
                                 <a
                                    href={item.href}
                                    className={classNames(
                                       item.current
                                          ? 'dark:hover:text-slate-700 hover:text-gray-400  '
                                          : 'dark:hover:text-slate-700 hover:text-gray-400 ',
                                       'h-full self-baseline transition-all duration-75 ease-in-out group flex gap-x-3 p-3 text-md font-medium text-gray-950 dark:text-gray-200/80 group-hover:text-opacity-75'
                                    )}
                                 >
                                    {item.name}
                                 </a>
                              </li>
                           ))}
                        </ul>
                     </nav>
                  </div>
                  {/* background blur for navigation */}
               </div>
            </div>
         </div>
         {/* blurred fixed navigation concept */}
         {!isTop && (
            <div className='fixed top-0 bottom-0 h-16 w-full bg-[rgba(19, 19, 19,.15)] z-40 opacity-[0.95] backdrop-blur-xl blur-lg'></div>
         )}{' '}
         <Divider position='fixed' className='bg-slate-200/30' />
         {/* this is another mobile version -- should change this into somewhere else? */}
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
      </header>
   );
};

export default Navbar;
