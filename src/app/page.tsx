'use client';

import { AppProps } from 'next/app';
import Navbar from './component/nav/navigation';

import About from './component/about';
import ProjectCards from './component/cards';
import ContactPage from './component/contact';
import FrontPage from './component/main';
import { useState } from 'react';
import Footer from './component/footer';
import { NAVIGATION, NavigationParams } from './constants';
import { ThemeProvider } from './library/contexts/ThemeContext';

export default function Home({ Component, pageProps }: AppProps) {
   const [isCanvasLoaded, setCanvasLoaded] = useState(false);
   const [navigation, setNavigation] = useState<NavigationParams[]>(NAVIGATION);

   const homeNav = navigation.find((nav) => nav.name === 'home');

   return (
      // is there another way? Seems like all context have to be passed here
      // to use native generateMeta or static meta files in 'layout'
      <ThemeProvider>
         <Navbar navigation={navigation} setNavigation={setNavigation} isHome={true} />
         <FrontPage homeNav={homeNav} />
         <About />
         <ProjectCards />
         <ContactPage />
         <Footer bgColor='bg-blue-500/60' />
      </ThemeProvider>
   );
}

// using useTransition effect to first load the other components?
