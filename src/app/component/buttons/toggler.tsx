import { Dispatch, useState, SetStateAction, useEffect, useLayoutEffect } from 'react';
import { Variants, motion } from 'framer-motion';
import { Switch } from '@headlessui/react';
import classNames from '@/app/library/helper';
import { ThemeContextParams } from '@/app/constants';

// put this into an object instead;
type Size = {
   large: {
      size: 'h-7 w-16';
      translateEnabled: 'translate-x-7';
      ball: 'h-8 w-8';
   };
   medium: {
      size: 'h-6 w-12';
      translateEnabled: 'translate-x-6';
      ball: 'h-5 w-5';
   };
};

export const Toggler = ({ theme, setTheme }: ThemeContextParams) => {
   const toggleTheme = () => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      const darkEnabled = theme === 'dark';

      setTheme(newTheme);

      window.localStorage.setItem('theme', newTheme);
   };

   // create an animation as if the ball is sliding
   const spring = {
      type: 'spring',
      duration: 1,
      stiffness: 200,
      damping: 35,
   };

   const iconVariants: Variants = {
      off: {
         //  moon
         rotate: 90,
         transition: {
            ...spring,
            rotate: {
               duration: 0.25,
               ease: 'linear',
               repeat: 0,
            },
         },
      },
      on: {
         // sun
         rotate: -90,
         transition: {
            ...spring,
            rotate: {
               duration: 0.25,
               ease: 'linear',
               repeat: 0,
            },
         },
      },
   };

   const darkMode = theme === 'dark';

   return (
      <Switch
         className={classNames(
            darkMode ? 'bg-gradient-to-l from-gray-600 via-slate-500 to-gray-400' : 'bg-slate-100',
            'inline-flex h-6 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none focus:ring-[0.5px] focus:ring-black dark:focus:ring-white focus:ring-offset-2'
         )}
         checked={darkMode}
         onChange={toggleTheme}
      >
         <span className='sr-only'>Change theme</span>
         <span
            className={classNames(
               darkMode ? 'translate-x-6' : 'translate-x-0',
               'pointer-events-none relative inline-block h-5 w-5 transform rounded-full shadow ring-0 transition-all duration-300 ease-in-out'
            )}
         >
            <span
               className={classNames(
                  darkMode ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-300 ease-in',
                  'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
               )}
               aria-hidden='true'
            >
               {/* Sun icon */}
               <motion.svg
                  layout
                  variants={iconVariants}
                  // className='h-10 w-10'
                  className={classNames(
                     darkMode ? 'rotate-90' : '-rotate-90',
                     'h-10 w-10 transition-all duration-200 ease-in'
                  )}
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
               {/* Add your sun SVG here */}
            </span>
            <span
               className={classNames(
                  darkMode ? 'opacity-100 duration-300 ease-in' : 'opacity-0 duration-100 ease-out',
                  'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
               )}
               aria-hidden='true'
            >
               {/* Moon icon */}
               <motion.svg
                  layout
                  variants={iconVariants}
                  className={classNames(
                     darkMode ? 'rotate-90' : '-rotate-90',
                     'h-10 w-10 transition-all duration-200 ease-in'
                  )}
                  viewBox='0 0 50 50'
                  fill='#c2c9ca'
                  xmlns='http://www.w3.org/2000/svg'
               >
                  <circle cx='25' cy='25' r='20' fill='#c2c9ca ' />
                  <circle cx='14' cy='16' r='2' fill='#595959' />
                  <circle cx='30' cy='15' r='5' fill='#595959' />
                  <circle cx='26' cy='33' r='4' fill='#595959' />
               </motion.svg>
               {/* Add your moon SVG here */}
            </span>
         </span>
      </Switch>
   );
};

//    return (
//       <Switch
//          checked={darkMode}
//          onChange={toggleTheme}
//          className={classNames(
//             !darkMode ? 'bg-gradient-to-l from-gray-600 via-slate-500 to-gray-400' : 'bg-slate-100',
//             'inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none focus:ring-[0.5px] focus:ring-black dark:focus:ring-white focus:ring-offset-2'
//          )}
//       >
//          <span className='sr-only'>change theme</span>

//          {/* where animation should go here */}

//          {/* this is the ball */}

//          {/* change this so that it is justify-end and justify-start? */}
//          <motion.span
//             layout
//             initial={darkMode}
//             animate={darkMode ? 'on' : 'off'}
//             transition={spring}
//             className={classNames(
//                !darkMode ? 'translate-x-5' : 'translate-x-0',
//                'pointer-events-none relative inline-block h-6 w-6 transform rounded-full shadow ring-0 transition duration-300 ease-in-out'
//             )}
//          >
//             <motion.span
//                layout
//                transition={spring}
//                className={classNames(
//                   !darkMode
//                      ? 'opacity-0 duration-100 ease-out'
//                      : 'opacity-100 duration-300 ease-in',
//                   'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
//                )}
//                aria-hidden='true'
//             >
//                {/* creating a simple svg that resembles moon/sun */}

//                <motion.svg
//                   variants={iconVariants}
//                   className='h-10 w-10'
//                   viewBox='0 0 50 50'
//                   fill='none'
//                   xmlns='http://www.w3.org/2000/svg'
//                >
//                   <defs>
//                      <radialGradient id='sunGradient' cx='0.5' cy='0.5' r='0.5'>
//                         <stop offset='0%' stopColor='#FFFC00' stopOpacity='1' />
//                         <stop offset='50%' stopColor='#FFD700' stopOpacity='1' />
//                         <stop offset='100%' stopColor='#FFA500' stopOpacity='1' />
//                      </radialGradient>
//                   </defs>
//                   <circle cx='25' cy='25' r='20' fill='url(#sunGradient)' />
//                </motion.svg>
//             </motion.span>

//             <motion.span
//                layout
//                className={classNames(
//                   !darkMode
//                      ? 'opacity-100 duration-300 ease-in'
//                      : 'opacity-0 duration-100 ease-out',
//                   'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
//                )}
//                aria-hidden='true'
//             >
//                {/* replace with MOON */}
//                <motion.svg
//                   variants={iconVariants}
//                   className='h-10 w-10'
//                   viewBox='0 0 50 50'
//                   fill='#c2c9ca'
//                   xmlns='http://www.w3.org/2000/svg'
//                >
//                   <circle cx='25' cy='25' r='20' fill='#c2c9ca ' />
//                   <circle cx='14' cy='16' r='2' fill='#595959' />
//                   <circle cx='30' cy='15' r='5' fill='#595959' />
//                   <circle cx='26' cy='33' r='4' fill='#595959' />
//                </motion.svg>
//             </motion.span>
//          </motion.span>
//       </Switch>
//    );
// };
