import classNames from '@/library/helper';
import { useScrollDirection } from '@/library/hooks/useScrollDirection';
import { Divider } from '../divider';
import MobileNavigation from './mobileNav';
import LargeNavigation from './desktopNav';

// here h-16 / top-16 is the breakpoint for header and main section
// should set this as constant so its easier to fix(?)

const Navbar = ({ isHome = true }: { isHome: boolean }) => {
   const { isTop, scrollDirection } = useScrollDirection();

   const HOME_COLOR = 'bg-[#184888]';
   const DEFAULT_COLOR = 'bg-[##1E5099]';

   // in home route the navigation position is 'fixed' otherwise relative
   const getBgColor = () => {
      if (!isHome) return DEFAULT_COLOR;

      return isTop ? HOME_COLOR : 'bg-transparent';
   };

   const getNavigationDisplay = () => {
      if (isHome) return 'fixed';

      if (scrollDirection === 'down') return 'hidden ';

      if (scrollDirection === 'up') return 'fixed';
   };

   return (
      // declare the color at the parent
      <header className={classNames(getBgColor())}>
         <div className='w-full'>
            {/* mobile version */}
            <MobileNavigation />

            {/* desktop version */}
            <LargeNavigation isTop={isTop} />
         </div>
         {/* blurred fixed navigation */}
         {(!isTop || !isHome) && (
            <div className='fixed top-0 bottom-0 h-16 w-full bg-[rgba(19, 19, 19,.15)] z-40 opacity-[0.95] backdrop-blur-xl blur-lg'></div>
         )}{' '}
         <Divider position='fixed' className='bg-slate-200/30' />
      </header>
   );
};

export default Navbar;
