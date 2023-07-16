import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '../../contexts/ThemeContext';

const inter = Inter({ subsets: ['latin'] });

// for generating metadata look here: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export const metadata: Metadata = {
   title: 'Portfolio',
   description: 'Portfolio by Paul Cho',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang='en'>
         <body className={inter.className}>
            <ThemeProvider>{children}</ThemeProvider>
         </body>
      </html>
   );
}
