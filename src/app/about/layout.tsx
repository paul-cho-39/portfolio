'use client';

import BackButton from '../component/buttons/backButton';
import { Toggler } from '../component/buttons/toggler';
import { Container } from '../component/layouts/container';
import Navbar from '../component/nav/navigation';

export default function AboutMeLayout({ children }: { children: React.ReactNode }) {
   return (
      <div>
         <Navbar isHome={false} />
         <section className='flex p-2 md:p-4 lg:p-6 dark:bg-slate-800 bg-white'>
            {/* side content */}
            <div className='md:w-20 lg:w-24 md:min-h-[80%] fixed md:flex flex-col p-4 hidden items-center justify-center'>
               <div className='absolute top-2 left-[50%]'>
                  <BackButton showBackText={true} />
               </div>
               <div className='absolute top-[40%] left-[50%]'>
                  <Toggler />
               </div>
            </div>

            {/* main content */}
            <Container className='flex-1 bg-red-500 dark:bg-slate-800 min-h-screen p-6 md:ml-[max(6rem,10vw)]'>
               {children}
            </Container>
         </section>
      </div>
   );
}
