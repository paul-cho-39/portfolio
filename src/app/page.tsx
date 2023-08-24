'use client';

import { AppProps } from 'next/app';
import Navbar from './component/nav/navigation';
import ContactMeFab from './component/fab/contact';
import { Barlow_Condensed } from 'next/font/google';
import dynamic from 'next/dynamic';
import { Toggler } from './component/buttons/toggler';
import Draggable from './component/draggables/draggable';
import ProjectCards from './component/draggables/cards';

// import Boxes from '../app/component/headers/tester';
// const DynamicComponentWithNoSSR = dynamic(() => import('../app/component/headers/tester'), {
//    ssr: false,
// });

const barlowCondensed = Barlow_Condensed({
   weight: '700',
   style: ['normal', 'italic'],
   subsets: ['latin'],
});

export default function Home({ Component, pageProps }: AppProps) {
   return (
      <main className='min-h-screen min-w-screen dark:bg-gray-900'>
         {/* <Navbar /> */}
         {/* <div className='w-full h-screen bg-gradient-to-br from-blue-500/75 via-blue-300/60 to-blue-100 dark:bg-gray-900 text-white'></div> */}

         {/* <ArrowDown /> */}
         <div className='grid grid-cols-3 gap-4'>
            <Draggable label='1' />
         </div>
         <section className='my-10'>
            <div>About me section here</div>
            <div className='mx-auto px-4 my-8'>
               <div
                  className='bg-cover bg-center bg-opacity-0 rounded-xl'
                  style={{
                     backgroundImage: `url(https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80)`,
                  }}
               >
                  <figure className='relative isolate pt-6 sm:pt-12'>
                     <p>
                        Gravida quam mi erat tortor neque molestie. Auctor aliquet at porttitor a
                        enim nunc suscipit tincidunt nunc. Et non lorem tortor posuere. Nunc eu
                        scelerisque interdum eget tellus non nibh scelerisque bibendum.
                     </p>
                     <figcaption className='mt-2 text-base'>
                        {/* tags - map it here */}
                        <div className='flex flex-row items-start'>
                           {/* map the badges here */}
                           <span className='inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-blue-700'>
                              Badge
                           </span>
                        </div>
                     </figcaption>
                  </figure>
               </div>
            </div>
         </section>
         <ProjectCards />

         <div className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex'></div>
      </main>
   );
}
