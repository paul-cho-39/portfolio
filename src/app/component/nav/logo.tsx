import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

const LogoImage = ({ isTop }: { isTop: boolean }) => {
   return (
      <div
         className={classNames(
            isTop ? '' : 'hidden',
            'relative top-0 left-6 z-[100] cursor-pointer transition-all hover:rotate- duration-100'
         )}
      >
         <Link href='/'>
            <Image
               src={'/images/testing1.png'}
               alt='logo image'
               aria-label='Home'
               width={64}
               height={64}
               //    className='cursor-pointer transition-all hover:rotate-[360] duration-100'
            />
         </Link>
      </div>
   );
};

export const HeaderTitle = () => {
   return (
      <div className='h-16 fixed flex items-center justify-center px-10 z-50'>
         <a role='navigation' href='/' aria-label='Home' className='cursor-pointer'>
            <span className='font-bold font-mono text-lg leading-tight text-[#4c4439]'>
               paul cho
            </span>
         </a>
      </div>
   );
};

export default LogoImage;
