import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import classNames from '@/app/library/helper';
import { useScrollDirection } from '@/app/library/hooks/useScrollDirection';
import ToggleTheme from '../buttons/toggleThemeButton';
import { ThemeContext } from '../../../../contexts/ThemeContext';
import { FrontPageGenerator, ThemeContextParams } from '../../../../constants';
import TypeWriter from '../effects/typeWriter';
import UnderlinedLink from '../buttons/underlinedButton';

import CircleSvg from '../circle';

const navigation = [
   { name: 'home', href: '#', num: '01.', current: true },
   { name: 'about', href: '#', num: '02.', current: false },
   { name: 'projects', href: '#', num: '03.', current: false },
   { name: 'contact', href: '#', num: '04.', current: false },
];

// navigation page has to be rewritten using rewrites
// change the name to Headers
const Navbar = () => {
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const { scrollDirection, isTop } = useScrollDirection();

   // change theme to somewhere else
   const { theme, setTheme } = useContext(ThemeContext) as ThemeContextParams;
   useEffect(() => {
      if (theme === 'dark') {
         document.documentElement.classList.add('dark');
      } else {
         document.documentElement.classList.remove('dark');
      }
   }, [theme]);

   return (
      <>
         {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
         <div>
            {/* mobile version */}
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
                                          {navigation.map((item) => (
                                             <li key={item.name}>
                                                <a
                                                   href={item.href}
                                                   className={classNames(
                                                      item.current
                                                         ? 'bg-sky-200 dark:bg-blue-500'
                                                         : 'text-gray-700 hover:bg-gray-300/30',
                                                      'group flex gap-x-3 rounded-2xl p-4 text-md leading-6 font-medium dark:text-gray-200'
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

            {/* Static sidebar for desktop -- switch height, text-color, bg-color, padding when scrolled */}
            {/* so create two navbars that passes props as children */}
            <div className='hidden mx-auto lg:items-center lg:h-16 lg:flex lg:w-full lg:flex-row'>
               {/* Sidebar component, swap this element with another sidebar if you like */}
               <div className='flex flex-row justify-center px-[40%] w-full h-full'>
                  <nav
                     className={classNames(
                        isTop
                           ? 'h-16'
                           : scrollDirection === 'down'
                           ? '-top-20'
                           : 'top-0 h-14 bg-slate-300/10 dark:bg-neutral-900/20 z-50',
                        'fixed transition-all duration-250 ease-in flex flex-row flex-1 w-full justify-center'
                     )}
                     // className='flex flex-row flex-1'
                  >
                     <ul role='list' className='flex flex-row items-center gap-x-3'>
                        {navigation.map((item, index) => (
                           <UnderlinedLink key={item.name} href={item.href} title={item.name}>
                              <span className='text-sm font-light tracking-tighter relative bottom-2 left-2'>
                                 {item.num}{' '}
                              </span>
                           </UnderlinedLink>
                           // <li key={item.name}>
                           //    <a
                           //       href={item.href}
                           //       className={classNames(
                           //          item.current
                           //             ? 'dark:hover:text-slate-700 hover:text-gray-400  '
                           //             : 'dark:hover:text-slate-700 hover:text-gray-400 ',
                           //          'transition-all duration-75 ease-in-out group flex gap-x-3 p-3 text-md font-medium text-gray-700 dark:text-gray-200/80 group-hover:text-opacity-75'
                           //       )}
                           //    >
                           //       <span className='text-sm font-light tracking-tighter relative bottom-2 left-2'>
                           //          {item.num}{' '}
                           //       </span>
                           //       {item.name}
                           //    </a>
                           // </li>
                        ))}
                        {/* have the position as absolute(?) or maybe just delete this entirely and put it somewhere else */}
                        <li className='absolute inset-8'>
                           <ToggleTheme theme={theme} setTheme={setTheme} />
                        </li>
                     </ul>
                  </nav>
               </div>
            </div>
         </div>

         {/* <div className='lg:pl-72'> */}
         {/* change navigation to here so that mobile works too? not inside nav(?) */}
         <div
            className={classNames(
               isTop
                  ? 'h-16'
                  : scrollDirection === 'down'
                  ? '-top-20'
                  : 'top-0 h-14 bg-slate-300/10 dark:bg-neutral-900/20 z-50',
               'bg- z-40 lg:h-0 shrink-0 fixed transition-all duration-250 ease-in flex flex-1 w-full justify-start px-6'
            )}
         >
            {/* // className='z-40 flex lg:h-0 shrink-0 items-center bg-white dark:bg-gray-900 px-4 sm:gap-x-6 sm:px-6 sm:w-full lg:px-8'> */}
            <div className='h-14 lg:hidden inline-flex items-center'>
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

         {/* TESTING HERE */}
         <main className='py-28 sm:py-28'>
            <div className='px-4 sm:px-6 lg:px-8'>
               <div className='h-[1000px] w-full'>
                  <TypeWriter wordGenerator={FrontPageGenerator} />
                  {/* <Boxes /> */}
                  <div className='mt-10'></div>
                  <CircleSvg height={100} width={100} />
               </div>
               <p className='h-[1000px] w-full'>TESTING HERE</p>
            </div>
         </main>
         {/* {/* </div> */}
      </>
   );
};

export default Navbar;
