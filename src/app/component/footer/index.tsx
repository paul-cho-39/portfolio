import { ContactItems } from '@/app/constants';
import Link from 'next/link';

// TODO: have it as like a wavy line (like the ocean)
const Footer = ({ isHome }: { isHome?: boolean }) => {
   return (
      <footer>
         <div className='py-6 overflow-hidden bg-blue-500'>
            <div className='flex justify-center space-x-4 mb-4'>
               {ContactItems.map((link, index) => (
                  <Link
                     key={index}
                     href={link.href}
                     className='hover:scale-110 transition-transform w-8 h-8'
                  >
                     <span className='sr-only'>{link.name}</span>
                     <span>
                        <link.Icon className='w-6 h-6' />
                     </span>
                  </Link>
               ))}
            </div>
            <p className='text-center'>Built and designed by Paul Cho</p>
         </div>
      </footer>
   );
};

export default Footer;
