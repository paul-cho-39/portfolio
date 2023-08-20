import { useState } from 'react';
import { motion } from 'framer-motion';
import { Switch } from '@headlessui/react';
import classNames from '@/app/library/helper';

// game plan:
// 1) framer-motion for whenever toggling
// 2) change the icon of the header

export const Toggler = () => {
   const [enabled, setEnabled] = useState(false);
   const handleToggle = () => {
      setEnabled(!enabled);
   };
   return (
      <Switch
         checked={enabled}
         onChange={setEnabled}
         className={classNames(
            !enabled ? 'bg-indigo-600' : 'bg-gray-200',
            'relative inline-flex h-9 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
         )}
      >
         <span className='sr-only'>Use setting</span>

         {/* where animation should go here */}

         {/* this is the ball */}

         {/* change this so that it is justify-end and justify-start? */}
         <motion.span
            layout
            transition={spring}
            className={classNames(
               !enabled ? 'translate-x-5 bg-yellow-50' : 'translate-x-0',
               'pointer-events-none relative inline-block h-8 w-8 transform rounded-full shadow ring-0 transition duration-200 ease-in-out'
            )}
         >
            <motion.span
               layout
               transition={spring}
               className={classNames(
                  !enabled ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in',
                  'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
               )}
               aria-hidden='true'
            >
               {/* replace with SUN */}
               <svg className='h-5 w-5 text-gray-400' fill='none' viewBox='0 0 12 12'>
                  <path
                     d='M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2'
                     stroke='currentColor'
                     strokeWidth={2}
                     strokeLinecap='round'
                     strokeLinejoin='round'
                  />
               </svg>
            </motion.span>

            <span
               className={classNames(
                  !enabled ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out',
                  'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
               )}
               aria-hidden='true'
            >
               {/* replace with MOON */}
               <svg className='h-3 w-3 text-indigo-600' fill='currentColor' viewBox='0 0 12 12'>
                  <path d='M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z' />
               </svg>
            </span>
         </motion.span>
      </Switch>
   );
};

// create an animation as if the ball is sliding
const spring = {
   type: 'spring',
   stiffness: 700,
   damping: 30,
};
