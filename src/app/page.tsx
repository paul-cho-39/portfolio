'use client';

import { AppProps } from 'next/app';
import Navbar from './component/nav/navigation';
import ContactMeFab from './component/fab/contact';
import { Barlow_Condensed } from 'next/font/google';
import dynamic from 'next/dynamic';
import { FrontPageGenerator } from '../../constants';
import UnderlinedLink from './component/buttons/underlinedButton';

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
         <Navbar />
         <div className='w-full h-screen bg:slate-100/2 dark:bg-gray-900 text-white'></div>
         <ContactMeFab />

         {/* <TypeWriter wordGenerator={FrontPageGenerator} /> */}
         <div className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex'></div>
      </main>
   );
}
