import classNames from 'classnames';
import { useScrollDirection } from '@/library/hooks/useScrollDirection';
import { Divider } from '../layouts/divider';
import MobileNavigation from './mobileNav';
import LargeNavigation from './desktopNav';
import { getBgColor, getPosition } from '@/app/library/helpers/getStyling';
import { useState, useEffect, useRef, SetStateAction, Dispatch } from 'react';
import { NAVIGATION, NavigationParams } from '@/app/constants';

// here h-16 / top-16 is the breakpoint for header and main section
// should set this as constant so its easier to fix(?)

export interface NavigationProps {
   isHome: boolean;
   navigation: NavigationParams[];
   setNavigation: Dispatch<SetStateAction<NavigationParams[]>>;
}

/** Navigation bar. For each page, it has to define navigation and setNavigation, which are passed as props to mobile and desktop navigation.
 * @returns JSX.Element
 */
const Navbar = ({ navigation, setNavigation, isHome = true }: NavigationProps) => {
   const { isTop, scrollDirection } = useScrollDirection();
   // const [nav, setNav] = useState<NavigationParams[]>(NAVIGATION);

   // intersection observer to track the position and the current section
   // mainly for re-starting the animation when navigating back 'home' section
   useEffect(() => {
      // only takes effect in home
      if (!isHome) return;

      const observer = new IntersectionObserver(
         (entries) => {
            entries.forEach((entry) => {
               if (entry.isIntersecting) {
                  setNavigation((nav) =>
                     nav.map((item) => ({
                        ...item,
                        current: item.href === `#${entry.target.id}`,
                     }))
                  );
               }
            });
         },
         { threshold: 0.5 }
      );

      navigation.forEach((item) => {
         const element = document.querySelector(item.href);
         if (element) observer.observe(element);
      });

      return () => observer.disconnect();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

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
            <MobileNavigation bgColor={BG_COLOR} navigation={navigation} isHome={isHome} />

            {/* desktop version */}
            <LargeNavigation
               navigation={navigation}
               setNavigation={setNavigation}
               bgColor={BG_COLOR}
               isHome={isHome}
               isTop={isTop}
            />
         </div>
         {/* blurred fixed navigation divider */}
         {(!isTop || !isHome) && (
            <div className='fixed top-0 bottom-0 h-16 w-full bg-[rgba(19, 19, 19,.15)] z-40 opacity-[0.95] backdrop-blur-xl blur-lg'></div>
         )}{' '}
         <Divider position='fixed' className='bg-slate-200/30 dark:bg-slate-300' />
      </header>
   );
};

export default Navbar;
