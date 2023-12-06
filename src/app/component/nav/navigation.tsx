import classNames from 'classnames';
import { useScrollDirection } from '@/library/hooks/useScrollDirection';
import { Divider } from '../divider';
import MobileNavigation from './mobileNav';
import LargeNavigation from './desktopNav';
import { getBgColor, getPosition } from '@/app/library/helpers/getStyling';

// here h-16 / top-16 is the breakpoint for header and main section
// should set this as constant so its easier to fix(?)

const Navbar = ({ isHome = true }: { isHome: boolean }) => {
   const { isTop, scrollDirection } = useScrollDirection();

   const BG_COLOR = getBgColor(isHome, isTop);
   const POSITION = getPosition(isHome, isTop, scrollDirection);

   return (
      // declare the color at the parent
      <header
         className={classNames(
            // BG_COLOR,
            POSITION,
            'transition-all duration-200 ease-linear'
         )}
      >
         <div className='w-full'>
            {/* mobile version */}
            <MobileNavigation isHome={isHome} />

            {/* desktop version */}
            <LargeNavigation bgColor={BG_COLOR} isHome={isHome} isTop={isTop} />
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
