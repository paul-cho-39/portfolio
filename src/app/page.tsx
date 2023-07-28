'use client';

import { AppProps } from 'next/app';
import Navbar from './component/nav/navigation';
import ContactMeFab from './component/fab/contact';
import dynamic from 'next/dynamic';
import Boxes from '../app/component/headers/tester';
import { FrontPageGenerator } from '../../constants';

const DynamicComponentWithNoSSR = dynamic(() => import('../app/component/headers/tester'), {
   ssr: false,
});

export default function Home({ Component, pageProps }: AppProps) {
   return (
      <main className='min-h-screen min-w-screen dark:bg-gray-900'>
         <Navbar />
         <div className='w-full h-screen bg:slate-100/2 dark:bg-gray-900 text-white'></div>
         <ContactMeFab />
         <Boxes />
         {/* <TypeWriter wordGenerator={FrontPageGenerator} /> */}
         <div className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex'></div>
      </main>
   );
}
