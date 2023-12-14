import Link from 'next/link';
import { EnvelopeIcon, EnvelopeOpenIcon } from '@heroicons/react/24/outline';

import { ContactItems } from '@/app/constants';
import classNames from 'classnames';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ContactsProps {
   displayEmail: boolean;
   size?: Size;
   stroke?: string;
   strokeWidth?: number;
   emailColor?: string;
   iconColor?: string;
}

const sizeClasses = {
   xs: 'w-4 h-4 lg:w-5 lg:h-5',
   sm: 'w-5 h-5 lg:w-6 lg:h-6',
   md: 'w-6 h-6 lg:w-7 lg:h-7',
   lg: 'w-8 h-8 lg:w-9 lg:h-9',
   xl: 'w-10 h-10 lg:w-12 lg:h-12',
};

const getNextLargerSize = (currentSize: Size): Size => {
   const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
   const currentIndex = sizes.indexOf(currentSize);
   // ensure it doesn't go beyond the largest size
   const nextIndex = Math.min(currentIndex + 1, sizes.length - 1);
   return sizes[nextIndex] as Size;
};

/**
 *
 * @param {Object} props
 * @param {boolean} props.displayEmail
 * @param {Object} props.size
 * @param {string} [props.iconColor]
 * @param {string} [props.emailColor]
 * @param {string} [props.stroke] - stroke applies only to 'LinkedIn' svg.
 * @param {number} [props.strokeWidth] - strokeWidth applies only to 'LinkedIn' svg.
 */
const Contacts = ({
   displayEmail,
   size,
   iconColor,
   emailColor,
   stroke,
   strokeWidth,
}: ContactsProps) => {
   const handleEmailClick = () => {
      const emailAddress = 'chosung2loud@gmail.com';
      window.location.href = `mailto:${emailAddress}`;
   };

   const iconSize = sizeClasses[size || 'md'] || sizeClasses.md;
   // adjusting for envelope size
   const nextSize = getNextLargerSize(size || 'md');
   const envelopeSize = sizeClasses[nextSize] || sizeClasses.lg;

   return (
      <div className='flex justify-center items-center space-x-6'>
         {ContactItems.map((link, index) => (
            <Link key={index} href={link.href} className='hover:scale-110 transition-transform'>
               <span className='sr-only'>{link.name}</span>
               {link.name === 'LinkedIn' ? (
                  <link.Icon
                     className={classNames(iconSize, iconColor, 'dark:text-gray-300')}
                     stroke={stroke}
                     strokeWidth={strokeWidth}
                  />
               ) : (
                  <link.Icon className={classNames(iconSize, iconColor, 'dark:text-gray-300')} />
               )}
            </Link>
         ))}
         {displayEmail && (
            <button onClick={handleEmailClick}>
               <EnvelopeIcon
                  className={classNames(
                     envelopeSize,
                     emailColor,
                     'hover:scale-110 transition-transform dark:text-gray-300'
                  )}
               />
               <span className='sr-only'>Email</span>
            </button>
         )}
      </div>
   );
};

export default Contacts;
