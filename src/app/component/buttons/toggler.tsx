import { useState } from 'react';
import { Variants, motion } from 'framer-motion';
import { Switch } from '@headlessui/react';
import classNames from '@/app/library/helper';

export const Toggler = () => {
   const [enabled, setEnabled] = useState(false);

   // create an animation as if the ball is sliding
   const spring = {
      type: 'spring',
      duration: 1,
      stiffness: 200,
      damping: 35,
   };

   const iconVariants: Variants = {
      off: {
         //  rotate: [0, 180, 360],
         rotate: 180,
         transition: {
            ...spring,
            rotate: {
               duration: 0.4,
               ease: 'linear',
               repeat: 0,
            },
         },
      },
      on: {
         rotate: -90,
         transition: {
            ...spring,
            rotate: {
               duration: 0.4,
               ease: 'linear',
               repeat: 0,
            },
         },
      },
   };

   return (
      <Switch
         checked={enabled}
         onChange={setEnabled}
         className={classNames(
            !enabled ? 'bg-gray-400/10' : 'bg-slate-100',
            'relative inline-flex h-9 w-16 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none focus:ring-[0.5px] focus:ring-black dark:focus:ring-white focus:ring-offset-2'
         )}
      >
         <span className='sr-only'>Use setting</span>

         {/* where animation should go here */}

         {/* this is the ball */}

         {/* change this so that it is justify-end and justify-start? */}
         <motion.span
            layout
            initial={false}
            animate={enabled ? 'on' : 'off'}
            transition={spring}
            className={classNames(
               !enabled ? 'translate-x-7' : 'translate-x-0',
               'pointer-events-none relative inline-block h-8 w-8 transform rounded-full shadow ring-0 transition duration-300 ease-in-out'
            )}
         >
            <motion.span
               transition={spring}
               className={classNames(
                  !enabled ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-300 ease-in',
                  'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
               )}
               aria-hidden='true'
            >
               {/* replace with SUN */}
               <motion.svg
                  variants={iconVariants}
                  className='h-10 w-10'
                  viewBox='0 0 50 50'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
               >
                  <defs>
                     <radialGradient id='sunGradient' cx='0.5' cy='0.5' r='0.5'>
                        <stop offset='0%' stopColor='#FFFC00' stopOpacity='1' />
                        <stop offset='50%' stopColor='#FFD700' stopOpacity='1' />
                        <stop offset='100%' stopColor='#FFA500' stopOpacity='1' />
                     </radialGradient>
                  </defs>
                  <circle cx='25' cy='25' r='20' fill='url(#sunGradient)' />
               </motion.svg>
            </motion.span>

            <span
               className={classNames(
                  !enabled ? 'opacity-100 duration-300 ease-in' : 'opacity-0 duration-100 ease-out',
                  'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
               )}
               aria-hidden='true'
            >
               {/* replace with MOON */}
               <motion.svg
                  variants={iconVariants}
                  className='h-10 w-10'
                  viewBox='0 0 50 50'
                  fill='#c2c9ca'
                  xmlns='http://www.w3.org/2000/svg'
               >
                  <circle cx='25' cy='25' r='20' fill='#c2c9ca ' />
                  <circle cx='14' cy='16' r='2' fill='#595959' />
                  <circle cx='30' cy='15' r='5' fill='#595959' />
                  <circle cx='26' cy='33' r='4' fill='#595959' />
               </motion.svg>
            </span>
         </motion.span>
      </Switch>
   );
};
