'use client';

import { useState } from 'react';
import { AppProps } from 'next/app';
import Navbar from './component/nav/navigation';

import About from './component/about';
import FrontPage from './component/main';
import { NAVIGATION, NavigationParams } from './constants';
import { ThemeProvider } from './library/contexts/ThemeContext';
import dynamic from 'next/dynamic';

const ProjectCardsLazy = dynamic(() => import('./component/cards'));
const ContactLazy = dynamic(() => import('./component/contact'));
const FooterLazy = dynamic(() => import('./component/footer'));

export default function Home({}) {
   const [navigation, setNavigation] = useState<NavigationParams[]>(NAVIGATION);
   const homeNav = navigation.find((nav) => nav.name === 'home');

   return (
      <ThemeProvider>
         <Navbar navigation={navigation} setNavigation={setNavigation} isHome={true} />
         <FrontPage homeNav={homeNav} />
         <About />
         <ProjectCardsLazy />
         <ContactLazy />
         <FooterLazy className='bg-blue-500/60' />
      </ThemeProvider>
   );
}
