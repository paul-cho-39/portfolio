import classNames from 'classnames';
import { useEffect, useState } from 'react';
import styles from './../styles.module.css';
import Link from 'next/link';
import { ContactItems } from '@/app/constants';

interface ContactMeFabProps {
   position?: 'top' | 'bottom';
}

const ContactMeFab = ({ position = 'bottom' }: ContactMeFabProps) => {
   const [isHovered, setIsHovered] = useState(false);

   return (
      <div
         className={classNames(`
        ${isHovered ? 'h-full' : 'h-10'} 
        lg:bg-red-300 lg:fixed lg:right-10 lg:bottom-16 dark:text-white text-black h-16
        `)}
      >
         <button onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <span className='absolute bottom-16 right-10 origin-bottom bg-red-500'>
               CONTACT ME ICON
            </span>
            <span className='sr-only'>Hover for contact lists</span>
            {isHovered && (
               <ul
                  className={classNames(
                     `${position === 'bottom' ? 'bottom-28' : 'top-20'} 
                     ${isHovered ? 'scale-100' : 'scale-0'}
                     absolute right-10 transition-all duration-300 origin-bottom my-0`
                  )}
                  role='list'
               >
                  {ContactItems.map((item, index) => {
                     const Icon = item.Icon;
                     const itemClass = [styles.animateFadeInDown];
                     const delayClasses = [
                        styles.delayFirst,
                        styles.delaySecond,
                        styles.delayThird,
                     ];
                     if (index < delayClasses.length) {
                        itemClass.push(delayClasses[index]);
                     }
                     return (
                        <li key={item.name} className={itemClass.join(' ')}>
                           <div className='group items-center px-5 py-1 hover:transition-transform hover:-translate-y-1'>
                              <Link href={item.href} className='-px-2'>
                                 <Icon
                                    className='stroke-stone-700 fill-stone-700 dark:stroke-gray-200/80 dark:fill-gray-200/80 group-hover:stroke-stone-400 group-hover:fill-stone-400 dark:group-hover:stroke-slate-600 dark:group-hover:fill-slate-600'
                                    height={28}
                                    width={34}
                                 />
                              </Link>
                           </div>
                        </li>
                     );
                  })}
               </ul>
            )}
         </button>
      </div>
   );
};

export default ContactMeFab;
