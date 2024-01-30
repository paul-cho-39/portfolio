import classNames from 'classnames';
import { ContactItems } from '@/app/constants';
import Link from 'next/link';
import ContactIcons, { ContactsProps } from '../contact/icons/contactIcons';

interface FooterProps extends Partial<ContactsProps> {
   withWaveBg: boolean;
   className?: string;
}

const Footer = ({ withWaveBg, className, ...props }: FooterProps) => {
   return (
      <footer>
         <div className={classNames(className, 'py-3 overflow-hidden')}>
            <div className='relative z-30'>
               <ContactIcons
                  className='my-2'
                  displayEmail={false}
                  stroke='black'
                  strokeWidth={1.15}
                  {...props}
               />
               <p className='py-2 text-center dark:text-gray-300 z-30'>
                  © Designed and Made by Paul Cho
               </p>
            </div>

            {/* wave-like background */}

            {withWaveBg && (
               <svg
                  className='absolute inset-0 w-full z-0'
                  xmlns='http://www.w3.org/2000/svg'
                  // viewBox='0 0 1440 320'
                  viewBox='0 0 1440 640'
               >
                  <path
                     // className='bg-blue-500/60'
                     fill='#3b82f6'
                     fill-opacity='1'
                     d='M0,64L30,69.3C60,75,120,85,180,101.3C240,117,300,139,360,122.7C420,107,480,53,540,26.7C600,0,660,0,720,16C780,32,840,64,900,106.7C960,149,1020,203,1080,192C1140,181,1200,107,1260,74.7C1320,43,1380,53,1410,58.7L1440,64L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z'
                  ></path>
               </svg>
            )}
         </div>
      </footer>
   );
};

// const Footer = ({ className, ...props }: FooterProps) => {
//    return (
//       <footer>
//          <div className={classNames(className, 'py-6 overflow-hidden')}>
//             <ContactIcons
//                className='my-2 z-30'
//                displayEmail={false}
//                stroke='black'
//                strokeWidth={1.1}
//                {...props}
//             />
//             <p className='py-2 text-center dark:text-gray-300 z-30'>
//                © Designed and Made by Paul Cho
//             </p>

//             {/* wave-like background */}
//             <svg
//                className='absolute inset-0 w-full z-0'
//                xmlns='http://www.w3.org/2000/svg'
//                viewBox='0 0 1440 320'
//             >
//                <path
//                   // className='fill-bg-blue-500/60'
//                   fill='#0099ff'
//                   fill-opacity='1'
//                   d='M0,64L30,69.3C60,75,120,85,180,101.3C240,117,300,139,360,122.7C420,107,480,53,540,26.7C600,0,660,0,720,16C780,32,840,64,900,106.7C960,149,1020,203,1080,192C1140,181,1200,107,1260,74.7C1320,43,1380,53,1410,58.7L1440,64L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z'
//                ></path>
//             </svg>
//          </div>
//       </footer>
//    );
// };

export default Footer;
