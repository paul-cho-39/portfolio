'use client';

import Navbar from '../component/nav/navigation';

export default function AboutMeLayout({ children }: { children: React.ReactNode }) {
   return (
      <section className='bg-red-500 min-h-screen'>
         <Navbar />
         <div className='min-h-full w-full'>{children}</div>
         {/* Include shared UI here e.g. a header or sidebar */}
      </section>
   );
}
