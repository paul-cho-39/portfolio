'use client';

import { AppProps } from 'next/app';
import { ThemeContext, ThemeProvider } from '../../contexts/ThemeContext';
import { useContext, useEffect } from 'react';
import ToggleTheme from './component/buttons/toggleThemeButton';
import Navbar from './component/nav/navigation';
import ScrollToTopButton from './component/buttons/scrollToTop';
import useMousePosition from './library/hooks/useMousePosition';

export default function Home({ Component, pageProps }: AppProps) {
   const position = useMousePosition();
   // Create a dynamic background style based on the mouse position
   // const backgroundStyle = {
   //    background: `
   //       // radial-gradient(
   //       //    circle 100px at ${position.x}px ${position.y}px,
   //       //    rgba(17, 24, 39, 1),
   //       //    rgba(17, 24, 39, 0)
   //       //    ),
   //       // radial-gradient(
   //       //    circle 200px at ${position.x}px ${position.y}px,
   //       //    rgba(17, 24, 39, 0.3), rgba(17, 24, 39, 0)
   //       //    )
   //       // radial-gradient(
   //       //    circle 250px at ${position.x}px ${position.y}px,
   //       //    #374151,
   //       //    #171717,
   //       //    )
   //          `,
   // };
   const backgroundStyle = {
      background: `
          radial-gradient(circle 150px at ${position.x}px ${position.y}px, rgba(17, 24, 39, 1), #0000000), 
          radial-gradient(circle 300px at ${position.x}px ${position.y}px, rgba(17, 24, 39, 0.3), #030712)
      `,
   };

   return (
      <main className='min-h-screen min-w-screen dark:bg-gray-900'>
         <Navbar />
         <div style={backgroundStyle} className='w-full h-screen bg-gray-900 text-white'>
            Hello
         </div>

         <div className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex'></div>
      </main>
   );
}
