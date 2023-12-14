import { ContactItems } from '@/app/constants';
import Link from 'next/link';
import Contacts from '../fab/contact';

interface FooterProps {
   isHome?: boolean;
   // bgColor?: 'bg-blue-500' | 'dark:bg-'
}

const Footer = ({ isHome }: { isHome?: boolean }) => {
   return (
      <footer>
         <div className='py-6 overflow-hidden bg-blue-500'>
            <Contacts displayEmail={false} stroke='black' strokeWidth={1.1} />
            <p className='text-center'>Built and designed by Paul Cho</p>
         </div>
      </footer>
   );
};

export default Footer;
