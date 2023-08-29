'use client';

import { AppProps } from 'next/app';
import Navbar from './component/nav/navigation';
import dynamic from 'next/dynamic';

import About from './component/about';
import FrontPage from './component/layouts/frontPageLayout';
import { ProjectSampler } from './component/headers/projects';
import ProjectCards from './component/cards/cards';

// import Boxes from '../app/component/headers/tester';
// const DynamicComponentWithNoSSR = dynamic(() => import('../app/component/headers/tester'), {
//    ssr: false,
// });

// TODO: dynamically import frontpage since it has the animation there

export default function Home({ Component, pageProps }: AppProps) {
   return (
      <>
         <Navbar />
         <main className='min-h-screen min-w-screen dark:bg-gray-900'>
            <FrontPage />
            <About />
            <ProjectCards />
         </main>
      </>
   );
}
