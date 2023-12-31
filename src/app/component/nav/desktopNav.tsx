import classNames from 'classnames';
import { Dispatch, SetStateAction, useState } from 'react';
import Link from 'next/link';

import HeaderTitle from './navTitle';
import WaveyLine from '../svg/wavey-line';

import type { NavigationParams } from '@/app/constants';
import { DarkThemeButton } from '../buttons/toggler';
import { MobileNavigationProps } from './mobileNav';

interface LargeNavigationProps extends MobileNavigationProps {
   bgColor: string;
}

const LargeNavigation = ({ navigation, isTop, isHome, bgColor }: LargeNavigationProps) => {
   return (
      <div className={classNames(bgColor, 'hidden mx-auto md:h-16 md:flex md:w-full')}>
         <div className='flex flex-row justify-stretch items-stretch w-full h-full'>
            <HeaderTitle />
            <div className='flex flex-row items-end justify-end w-full h-full bg-transparent'>
               <nav
                  role='navigation'
                  className={classNames(
                     isTop
                        ? 'h-16 bg-transparent text-gray-900' // opacty bg-blur
                        : 'h-16',
                     'z-50 bg-transparent fixed transition-all duration-100 ease-in px-10'
                  )}
               >
                  <ul
                     role='list'
                     className='flex flex-row items-center justify-center gap-x-1 h-full group'
                  >
                     {navigation.map((item, index) => (
                        <NavItem key={index} item={item} isHome={isHome} />
                     ))}
                     {/* toggler at the projects */}
                     {!isHome && (
                        <li aria-hidden className='inline-flex items-center justify-center'>
                           <DarkThemeButton />
                        </li>
                     )}
                  </ul>
               </nav>
            </div>
         </div>
      </div>
   );
};

const NavItem = ({ item, isHome }: { item: NavigationParams; isHome: boolean }) => {
   const [isHovered, setIsHovered] = useState(false);

   return (
      <li
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
         className={classNames(
            isHome ? 'text-black dark:text-black' : 'dark:text-gray-200',
            'mx-1 dark:text-gray-200'
         )}
      >
         <Link
            href={isHome ? item.href : '/' + item.href}
            className='relative h-full self-baseline group flex gap-x-3 p-3 hover:font-bold group-hover:text-opacity-60'
         >
            <span className='relative text-lg xl:text-xl font-medium'>{item.name}</span>
            <span className='absolute bottom-0 left-2 w-full overflow-hidden'>
               <WaveyLine
                  className='dark:text-gray-200 text-blue-700'
                  isHovered={isHovered}
                  height={10}
                  width={60}
               />
            </span>
         </Link>
      </li>
   );
};

export default LargeNavigation;
