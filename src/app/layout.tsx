'use client';

import './globals.css';
import type { Metadata } from 'next';
import { Montserrat_Alternates, Barlow_Condensed } from 'next/font/google';
import { ThemeProvider } from './library/contexts/ThemeContext';
import Navbar from './component/nav/navigation';
import Footer from './component/footer';

export const montserratAlternatives = Montserrat_Alternates({
   display: 'swap',
   variable: '--font-montserrat-alternative',
   subsets: ['latin'],
   weight: '500',
});

const barlowCondensed = Barlow_Condensed({
   weight: '400',
   display: 'swap',
   variable: '--font-barlow-condensed',
   style: ['normal', 'italic'],
   subsets: ['latin'],
});

// for generating metadata look here: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export const metadata: Metadata = {
   title: 'Portfolio',
   description: 'Portfolio by Paul Cho',
   authors: { name: 'Paul Cho' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang='en'>
         {/* <Navbar /> */}
         <body className={(montserratAlternatives.variable, barlowCondensed.variable)}>
            <ThemeProvider>{children}</ThemeProvider>
         </body>
         <Footer />
      </html>
   );
}
