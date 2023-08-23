'use client';

import { AppProps } from 'next/app';
import Navbar from './component/nav/navigation';
import ContactMeFab from './component/fab/contact';
import { Barlow_Condensed } from 'next/font/google';
import dynamic from 'next/dynamic';
import { Toggler } from './component/buttons/toggler';
import Draggable from './component/draggables/draggable';

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
            <Draggable label='2' />
            <Draggable label='3' />
            <Draggable label='4' />
         </div>
         <div className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex'></div>
      </main>
   );
}
