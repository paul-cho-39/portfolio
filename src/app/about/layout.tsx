'use client';

import BackButton from '../component/buttons/backButton';
import { Toggler } from '../component/buttons/toggler';
import { Container } from '../component/layouts/container';
import Navbar from '../component/nav/navigation';

export default function AboutMeLayout({ children }: { children: React.ReactNode }) {
   return (
      <div>
         <Navbar isHome={false} />
         <section
            style={{
               backgroundImage: 'url("/white-brushed.png")',
               // backgroundColor: 'var(--background-profile',
            }}
         >
            <Container className='h-full w-full dark:bg-slate-800 min-h-screen'>
               <BackButton showBackText={true} />
               <Toggler />
               {children}
            </Container>
         </section>
      </div>
   );
}
