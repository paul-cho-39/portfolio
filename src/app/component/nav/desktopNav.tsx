import { Navigation } from '@/app/constants';
import classNames from 'classnames';
import LogoImage, { HeaderTitle } from './logo';

const LargeNavigation = ({ isTop }: { isTop: boolean }) => {
   return (
      <div className='hidden mx-auto md:h-16 md:flex md:w-full'>
         <div className='flex flex-row justify-stretch items-stretch w-full h-full'>
            {/* <div className='fixed'> */}
            {/* <div className='h-full inline-flex items-center justify-center px-6'>Logo</div> */}
            <HeaderTitle />
            {/* </div> */}
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
                     className='flex flex-row items-center justify-center gap-x-1 h-full'
                  >
                     {Navigation.map((item, index) => (
                        <li className='' key={index}>
                           <a
                              href={item.href}
                              className={classNames(
                                 item.current
                                    ? 'dark:hover:text-slate-700 hover:text-gray-400 text-opacity-75  '
                                    : 'dark:hover:text-slate-700 hover:text-gray-400 text-opacity-75 ',
                                 'h-full self-baseline text-lg ease-in-out group flex gap-x-3 p-3 text-md font-medium text-gray-950 dark:text-gray-200/80 group-hover:text-opacity-75'
                              )}
                           >
                              {item.name}
                           </a>
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
