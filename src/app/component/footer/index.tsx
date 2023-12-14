import { ContactItems } from '@/app/constants';
import Link from 'next/link';
import ContactIcons from '../contact/icons/contactIcons';

interface FooterProps {
   bgColor?: 'bg-blue-500' | string;
}

const Footer = ({ bgColor }: FooterProps) => {
   return (
      <footer>
         <div className='py-6 overflow-hidden bg-blue-500'>
            <ContactIcons className='my-2' displayEmail={false} stroke='black' strokeWidth={1.1} />
            <p className='py-2 text-center'>© Built and designed by Paul Cho</p>
         </div>
      </footer>
   );
};

export default Footer;
