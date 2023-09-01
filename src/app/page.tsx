'use client';

import { AppProps } from 'next/app';
import Navbar from './component/nav/navigation';
import dynamic from 'next/dynamic';

import About from './component/about';
import FrontPage from './component/layouts/frontPageLayout';
import { ProjectSampler } from './component/headers/projects';
import ProjectCards from './component/cards/cards';
import ContactPage from './component/contact';
import { ProjectImage } from './component/cards/image';

// import Boxes from '../app/component/headers/tester';
// const DynamicComponentWithNoSSR = dynamic(() => import('../app/component/headers/tester'), {
//    ssr: false,
// });

// TODO: dynamically import frontpage because of threeJS

export default function Home({ Component, pageProps }: AppProps) {
   return (
      <>
         <Navbar />
         <main className='min-h-screen min-w-screen'>
            <FrontPage />
            <About />
            <ProjectCards />
            <ContactPage />
         </main>
      </>
   );
}
