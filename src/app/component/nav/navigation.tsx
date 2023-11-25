import classNames from '@/library/helper';
import { useScrollDirection } from '@/library/hooks/useScrollDirection';
import { Divider } from '../divider';
import { Navigation } from '@/app/constants';
import MobileNavigation from './mobileNav';
import LargeNavigation from './desktopNav';

// here h-16 / top-16 is the breakpoint for header and main section
// should set this as constant so its easier to fix(?)

const Navbar = () => {
   const { isTop } = useScrollDirection();

   return (
      <header className={classNames(isTop ? 'bg-[#184888]' : 'bg-transparent')}>
         <div className='w-full'>
            {/* mobile version */}
            <MobileNavigation />

            {/* desktop version */}
            <LargeNavigation isTop={isTop} />
         </div>
         {/* blurred fixed navigation */}
         {!isTop && (
            <div className='fixed top-0 bottom-0 h-16 w-full bg-[rgba(19, 19, 19,.15)] z-40 opacity-[0.95] backdrop-blur-xl blur-lg'></div>
         )}{' '}
         <Divider position='fixed' className='bg-slate-200/30' />
      </header>
   );
};

export default Navbar;
