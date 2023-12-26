'use client';

import { AppProps } from 'next/app';
import Navbar from './component/nav/navigation';

import About from './component/about';
import ProjectCards from './component/cards';
import ContactPage from './component/contact';
import FrontPage from './component/main';
import { lazy, Suspense, useEffect, useState } from 'react';
import Footer from './component/footer';
import { NAVIGATION, NavigationParams } from './constants';
import { ThemeProvider } from './library/contexts/ThemeContext';
import dynamic from 'next/dynamic';

const AboutLazy = dynamic(() => import('./component/about'));
const ProjectCardsLazy = dynamic(() => import('./component/cards'));
const FooterLazy = dynamic(() => import('./component/footer'));

export default function Home({}) {
   const [navigation, setNavigation] = useState<NavigationParams[]>(NAVIGATION);
   const homeNav = navigation.find((nav) => nav.name === 'home');

   return (
      <ThemeProvider>
         <Navbar navigation={navigation} setNavigation={setNavigation} isHome={true} />
         <FrontPage homeNav={homeNav} />
         <AboutLazy />
         <ProjectCardsLazy />
         <ContactPage />
         <FooterLazy className='bg-blue-500/60' />
      </ThemeProvider>
   );
}
