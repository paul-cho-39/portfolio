import { navigation } from '@/app/constants';
import classNames from 'classnames';
import HeaderTitle from './navTitle';
import WaveyLine from '../svg/wavey-line';
import { useState } from 'react';
import Link from 'next/link';

interface LargeNavigationProps {
   isTop: boolean;
   isHome: boolean;
   bgColor: string;
}

const LargeNavigation = ({ isTop, isHome, bgColor }: LargeNavigationProps) => {
   const [navItems, setNavItems] = useState(navigation);

   const handleMouseEnter = (name: string) => {
      setNavItems(navItems.map((item) => (item.name === name ? { ...item, current: true } : item)));
   };

   const handleMouseLeave = () => {
      setNavItems(navItems.map((item) => ({ ...item, current: false })));
   };

   return (
      <div className={classNames(bgColor, 'hidden mx-auto md:h-16 md:flex md:w-full')}>
         <div className='flex flex-row justify-stretch items-stretch w-full h-full'>
            <HeaderTitle />
            <div className='flex flex-row items-end justify-end w-full h-full bg-transparent'>
               <nav
                  role='navigation'
                  className={classNames(
                     isTop
                        ? 'h-16 bg-transparent text-gray-950' // opacty bg-blur
                        : 'h-16',
                     'z-50 bg-transparent fixed transition-all duration-100 ease-in px-10'
                  )}
               >
                  <ul
                     role='list'
                     className='flex flex-row items-center justify-center gap-x-1 h-full group'
                  >
                     {navItems.map((item, index) => (
                        <li
                           key={index}
                           onMouseLeave={handleMouseLeave}
                           onMouseEnter={() => handleMouseEnter(item.name)}
                           className='mx-1 dark:text-gray-200'
                        >
                           <Link
                              href={isHome ? item.href : '/' + item.href}
                              className={classNames(
                                 'relative h-full self-baseline group flex gap-x-3 p-3 group-hover:text-opacity-60'
                              )}
                           >
                              <span className='relative text-lg font-medium'>{item.name}</span>
                              <span>/</span>
                              <span className='absolute bottom-0 left-2 w-full overflow-hidden'>
                                 <WaveyLine isHovered={item.current} height={10} width={55} />
                              </span>
                           </Link>
                        </li>
                     ))}
                  </ul>
               </nav>
            </div>
         </div>
      </div>
   );
};

export default LargeNavigation;
