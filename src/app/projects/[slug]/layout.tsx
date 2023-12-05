'use client';

import BackButton from '@/app/component/buttons/backButton';
import { Toggler } from '@/app/component/buttons/toggler';
import { Container } from '@/app/component/layouts/container';
import Navbar from '@/app/component/nav/navigation';
import classNames from 'classnames';

export default function ProjectLayouts({ children }: { children: React.ReactNode }) {
   return (
      <div className='min-h-screen w-full'>
         <Navbar isHome={false} />
         <section className='w-full md:grid md:grid-cols-12 md:gap-0 dark:bg-zinc-800 bg-white overflow-hidden'>
            {/* side content only in larger screen */}
            <aside className='col-span-1 md:mt-2 lg:mt-4'>
               <div
                  className={classNames(
                     'fixed md:min-h-[80%] lg:w-20 md:w-16 md:flex flex-col p-4 hidden items-center justify-center'
                  )}
               >
                  <div className='absolute top-4 left-[50%]'>
                     <BackButton showBackText={true} />
                  </div>
                  <div className='absolute top-[40%] left-[50%]'>
                     <Toggler />
                  </div>
               </div>
            </aside>

            {/* main content. Also, containing side-content (ref, dictionary, etc.) */}
            {/* <div className='mt-14 lg:mt-8 md:col-span-11 dark:bg-zinc-800 min-h-screen p-2 md:ml-[max(6rem,10vw)] lg:ml-[max(10rem,14vw)] xl:md:ml-[max(12rem,16vw)] text-base md:text-lg'> */}
            <div className='mt-14 lg:mt-8 md:col-span-11 dark:bg-zinc-800 min-h-screen text-base md:text-lg w-full md:col-start-4 md:col-end-11'>
               <div className='px-6 lg:px-6 max-w-2xl lg:max-w-[52rem] xl:max-w-[54rem] w-full '>
                  {children}
               </div>
            </div>
         </section>
      </div>
   );
}
