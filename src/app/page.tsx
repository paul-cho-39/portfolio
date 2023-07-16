'use client';

import { AppProps } from 'next/app';
import Image from 'next/image';
import { ThemeContext, ThemeProvider } from '../../contexts/ThemeContext';
import { useContext, useEffect } from 'react';
import ToggleTheme from './component/buttons/toggleThemeButton';

export default function Home({ Component, pageProps }: AppProps) {
   const { theme, setTheme } = useContext(ThemeContext);

   useEffect(() => {
      if (theme === 'dark') {
         document.documentElement.classList.add('dark');
      } else {
         document.documentElement.classList.remove('dark');
      }
   }, [theme]);

   return (
      <main className='flex min-h-screen flex-col items-center justify-between p-24 dark:bg-black'>
         <div className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex'>
            <p className='dark:text-md text-black dark:text-white'>Hello world</p>
            <ToggleTheme theme={theme} setTheme={setTheme} />
         </div>
      </main>
   );
}
