'use client';

import BackButton from '@/app/component/buttons/backButton';
import { Toggler } from '@/app/component/buttons/toggler';
import { Container } from '@/app/component/layouts/container';
import Navbar from '@/app/component/nav/navigation';
import { useState } from 'react';
import { NAVIGATION, NavigationParams } from '../constants';
import { ThemeProvider } from '../library/contexts/ThemeContext';
import AsideWrapper from '../component/layouts/_pages/asideWrap';

export default function ProjectLayouts({ children }: { children: React.ReactNode }) {
   const [navigation, setNavigation] = useState<NavigationParams[]>(NAVIGATION);

   return (
      <ThemeProvider>
         <div className='min-h-screen w-full'>
            <Navbar navigation={navigation} setNavigation={setNavigation} isHome={false} />

            {/* section here - desktop version contains 12 columns grids */}
            <section className='w-full h-full md:grid md:grid-cols-12 md:gap-0 dark:bg-zinc-800 bg-white overflow-hidden'>
               <AsideWrapper />
               {/* main content. Also, containing side-content (ref, dictionary, etc.) */}
               <div className='w-full md:col-span-10 h-full dark:bg-zinc-800 min-h-screen text-base md:text-lg'>
                  <div className='mt-14 lg:mt-8 md:col-start-1 md:col-end-10'>
                     {/* <div className='px-6 lg:px-6 max-w-2xl lg:max-w-[52rem] xl:max-w-[54rem] w-full bg-slate-300'> */}
                     {children}
                     {/* </div> */}
                  </div>
               </div>
            </section>
         </div>
      </ThemeProvider>
   );
}
