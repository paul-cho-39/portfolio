'use client';

import { AppProps } from 'next/app';
import Navbar from './component/nav/navigation';
import dynamic from 'next/dynamic';

import About from './component/about';
import ProjectCards from './component/cards/project';
import ContactPage from './component/contact';
import FrontPage from './component/main';
import { useState } from 'react';
import LogoImage from './component/nav/navTitle';

const DynamicCanvas = dynamic(() => import('@/components/effects/scene'), {
   ssr: false,
});

// TODO: dynamically import frontpage because of threeJS
// TODO: in the front page maybe add framer motion to display the order of components

export default function Home({ Component, pageProps }: AppProps) {
   const [isCanvasLoaded, setCanvasLoaded] = useState(false);

   return (
      <>
         <Navbar />
         {/* TODO: blank with loader screen(?) */}
         <FrontPage />
         {/* <DynamicCanvas /> */}
         {/* </FrontPage> */}
         <About />
         <ProjectCards />
         <ContactPage />
      </>
   );
}
