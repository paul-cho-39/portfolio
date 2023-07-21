'use client';

import { AppProps } from 'next/app';
import Navbar from './component/nav/navigation';
import ContactMeFab from './component/fab/contact';
import FrontCover from './component/headers/front';

export default function Home({ Component, pageProps }: AppProps) {
   return (
      <main className='min-h-screen min-w-screen dark:bg-gray-900'>
         <Navbar />
         <div className='w-full h-screen bg-gray-900 text-white'></div>
         <ContactMeFab />
         <div className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex'></div>
      </main>
   );
}
