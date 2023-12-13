'use client';

import BackButton from '@/app/component/buttons/backButton';
import { Toggler } from '@/app/component/buttons/toggler';
import { Container } from '@/app/component/layouts/container';
import Navbar from '@/app/component/nav/navigation';
import classNames from 'classnames';
import { useScrollDirection } from '../library/hooks/useScrollDirection';
import { useState } from 'react';
import { NAVIGATION, NavigationParams } from '../constants';

export default function ProjectLayouts({ children }: { children: React.ReactNode }) {
   const { isTop, scrollDirection } = useScrollDirection();

   const [navigation, setNavigation] = useState<NavigationParams>(NAVIGATION);

   const hideAside = !isTop && scrollDirection === 'down';

   return (
      <div className='min-h-screen w-full'>
         <Navbar navigation={navigation} setNavigation={setNavigation} isHome={false} />
         <section className='w-full md:grid md:grid-cols-12 md:gap-0 dark:bg-zinc-800 bg-white overflow-hidden'>
            {/* side content only in larger screen */}
            <aside className='col-span-1 md:mt-2 lg:mt-4'>
               <div
                  className={classNames(
                     hideAside ? 'hidden' : 'fixed',
                     'md:min-h-[80%] lg:w-20 md:w-16 md:flex flex-col p-4 hidden items-center justify-center transition-all duration-200 ease-linear'
                  )}
               >
                  <div className='absolute top-4 left-[50%]'>
                     <BackButton showBackText={true} />
                  </div>
                  <div
                     className={classNames(
                        hideAside ? 'hidden' : 'absolute',
                        'top-[40%] left-[50%]'
                     )}
                  >
                     <Toggler isHidden={hideAside} />
                  </div>
               </div>
            </aside>

            {/* main content. Also, containing side-content (ref, dictionary, etc.) */}
            <div className='mt-14 lg:mt-8 md:col-span-11 dark:bg-zinc-800 min-h-screen text-base md:text-lg w-full md:col-start-4 md:col-end-11'>
               <div className='px-6 lg:px-6 max-w-2xl lg:max-w-[52rem] xl:max-w-[54rem] w-full '>
                  {children}
               </div>
            </div>
         </section>
      </div>
   );
}
