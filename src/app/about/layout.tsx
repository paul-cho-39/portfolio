'use client';

import classNames from 'classnames';
import BackButton from '../component/buttons/backButton';
import { Toggler } from '../component/buttons/toggler';
import { Container } from '../component/layouts/container';
import Navbar from '../component/nav/navigation';

export default function AboutMeLayout({ children }: { children: React.ReactNode }) {
   return (
      <div className=''>
         <Navbar isHome={false} />
         <section className='grid grid-cols-12 grid-rows-6 gap-0 dark:bg-zinc-800 bg-white'>
            {/* side content */}
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
            <Container className='col-span-11  dark:bg-zinc-800 min-h-screen p-6 md:ml-[max(6rem,10vw)] text-lg'>
               {children}
            </Container>
         </section>
      </div>
   );
}
