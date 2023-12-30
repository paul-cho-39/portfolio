import classNames from 'classnames';
import { ContactItems } from '@/app/constants';
import Link from 'next/link';
import ContactIcons, { ContactsProps } from '../contact/icons/contactIcons';

interface FooterProps extends Partial<ContactsProps> {
   className?: string;
}

const Footer = ({ className, ...props }: FooterProps) => {
   return (
      <footer>
         <div className={classNames(className, 'py-6 overflow-hidden bg-blue-500')}>
            <ContactIcons
               className='my-2'
               displayEmail={false}
               stroke='black'
               strokeWidth={1.1}
               {...props}
            />
            <p className='py-2 text-center dark:text-gray-300'>© Designed and Made by Paul Cho</p>
         </div>
      </footer>
   );
};

export default Footer;
