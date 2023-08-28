import './globals.css';
import type { Metadata } from 'next';
import { Montserrat_Alternates } from 'next/font/google';
import { ThemeProvider } from './library/contexts/ThemeContext';

export const montserratAlternatives = Montserrat_Alternates({
   display: 'swap',
   variable: '--font-montserrat-alternative',
   subsets: ['latin'],
   weight: '500',
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
         <body className={montserratAlternatives.variable}>
            <ThemeProvider>{children}</ThemeProvider>
         </body>
      </html>
   );
}
