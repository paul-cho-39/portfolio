'use client';

import { AppProps } from 'next/app';
import Navbar from './component/nav/navigation';

import About from './component/about';
import ProjectCards from './component/cards/project';
import ContactPage from './component/footer/contact';
import FrontPage from './component/main';
import { useState } from 'react';
import Footer from './component/footer';
import { NAVIGATION, NavigationParams } from './constants';

// TODO: dynamically import frontpage because of threeJS
// TODO: in the front page maybe add framer motion to display the order of components

export default function Home({ Component, pageProps }: AppProps) {
   const [isCanvasLoaded, setCanvasLoaded] = useState(false);
   const [navigation, setNavigation] = useState<NavigationParams[]>(NAVIGATION);

   const homeNav = navigation.find((nav) => nav.name === 'home');

   return (
      <>
         <Navbar navigation={navigation} setNavigation={setNavigation} isHome={true} />
         <FrontPage homeNav={homeNav} />
         <About />
         <ProjectCards />
         <ContactPage />
         <Footer />
      </>
   );
}

// using useTransition effect to first load the other components?
