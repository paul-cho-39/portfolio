import './globals.css';
import type { Metadata } from 'next';
import { Montserrat_Alternates, Barlow_Condensed } from 'next/font/google';

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
   title: 'Paul Cho | Software Engineer',
   description: 'Software Portfolio by Paul Cho',
   authors: { name: 'Paul Cho' },
   creator: 'Paul Cho',
   keywords: ['Portfolio', 'Software Developer', 'Front-end', 'Back-end', 'Full-stack'],
   applicationName: "Paul's Portfolio",
   openGraph: {
      type: 'website',
      title: "Paul's Portfolio",
   },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang='en'>
         <body className={(montserratAlternatives.variable, barlowCondensed.variable)}>
            {children}
         </body>
      </html>
   );
}
