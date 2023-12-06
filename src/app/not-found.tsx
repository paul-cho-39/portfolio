import Link from 'next/link';
import Image from 'next/image';
import ROUTES from './utils/routes';

export default function NotFound() {
   return (
      <main className='min-h-screen w-full'>
         <div className='mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8'>
            <p className='text-base font-semibold leading-8 text-gray-800'>404</p>
            <h1 className='mt-4 text-3xl font-bold tracking-tight text-gray-800 sm:text-5xl'>
               Page not found
            </h1>
            <p className='mt-4 text-base text-gray-800 sm:mt-6'>
               Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div className='mt-10 flex justify-center'>
               <Link
                  href={ROUTES.HOME}
                  className='text-sm font-semibold leading-7 text-gray-800 hover:underline hover:decoration-black'
               >
                  <span aria-hidden='true'>&larr;</span> Back to home
               </Link>
            </div>
         </div>
         ;
      </main>
   );
}
