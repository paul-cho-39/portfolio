'use client';

import { useState } from 'react';
import Navbar from './component/nav/navigation';

import About from './component/about';
import FrontPage from './component/main';
import { NAVIGATION, NavigationParams } from './constants';
import dynamic from 'next/dynamic';
import Contact from './component/contact';
import Footer from './component/footer';
import { ThemeProvider } from './library/contexts/ThemeContext';

const ProjectCardsLazy = dynamic(() => import('./component/cards'), {
   loading: () => <div></div>,
});

export default function Home({}) {
   const [navigation, setNavigation] = useState<NavigationParams[]>(NAVIGATION);

   const homeNav = navigation.find((nav) => nav.name === 'home');

   return (
      <ThemeProvider>
         <main>
            <Navbar navigation={navigation} setNavigation={setNavigation} isHome={true} />
            <FrontPage homeNav={homeNav} />
            <About />
            <ProjectCardsLazy />
            <Contact />
            {/* <Footer className='sky-fade-gradient bg-blue-500/60 text-black dark:text-black bg-blue-500 dark:bg-blue-500' /> */}
            {/* <Footer className='relative bg-transparent text-black dark:text-black' /> */}
         </main>
      </ThemeProvider>
   );
}
