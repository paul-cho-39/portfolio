import { Navigation } from '@/app/constants';
import classNames from 'classnames';

const LargeNavigation = ({ isTop }: { isTop: boolean }) => {
   return (
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
                     {Navigation.map((item, index) => (
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
         </div>
      </div>
   );
};

export default LargeNavigation;
