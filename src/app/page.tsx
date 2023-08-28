'use client';

import { AppProps } from 'next/app';
import Navbar from './component/nav/navigation';
import { Barlow_Condensed } from 'next/font/google';
import dynamic from 'next/dynamic';

import About from './component/about';
import FrontPageLayout from './component/layouts/frontPageLayout';
import FrontPage from './component/layouts/frontPageLayout';

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
      <>
         <Navbar />
         <main className='min-h-screen min-w-screen dark:bg-gray-900'>
            <FrontPage />
         </main>
      </>
   );
}
