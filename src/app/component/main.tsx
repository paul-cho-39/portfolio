import React, { Suspense, lazy, useLayoutEffect, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
   useAnimation,
   useScroll,
   motion,
   useMotionValueEvent,
   useMotionValue,
   useInView,
} from 'framer-motion';
import classNames from 'classnames';

import FronPageLayout from './layouts/home/frontSectionLayout';
import { FrontCoverDescriptionWrapper } from './description/frontCoverDescription';
import { NavigationParams } from '../constants';
import { useDisableBreakPoints } from '../library/hooks/useDisableBreakPoints';

const SCROLL_THRESHOLD = 0.55;

const Canvas = lazy(() => import('./effects/scene'));

const FrontPage = ({
   homeNav,
   children,
}: {
   homeNav: NavigationParams | undefined;
   children?: React.ReactNode;
}) => {
   const ref = useRef<HTMLDivElement>(null);
   const pathName = usePathname();
   const canvasRef = useRef<HTMLCanvasElement | null>(null);

   const isInView = useInView(ref, {
      margin: '-300px',
   });

   const isSizeBiggerThanMid = useDisableBreakPoints();
   const controls = useAnimation();
   const { scrollY } = useScroll();
   const opacity = useMotionValue(1);

   useMotionValueEvent(scrollY, 'change', (latest) => {
      if (!ref.current || !isInView) return;

      const sectionHeight = ref.current?.scrollHeight;
      const scrollPercentage = Math.max((sectionHeight - latest) / sectionHeight, 0);

      if (!homeNav || (homeNav && !homeNav.current)) {
         // detach the entire component from the tree

         controls.set({ display: 'none' });
      }

      if (homeNav && homeNav.current) {
         controls.start({ display: 'flex' });
         opacity.set(scrollPercentage);
         if (scrollPercentage < SCROLL_THRESHOLD) {
            // accelerates the opacity as it scrolls down
            const targetOpacity = Math.pow(scrollPercentage, 1.6);
            opacity.set(targetOpacity);
         }
      }
   });

   useEffect(() => {
      // when 'home' is active and navigated to 'home' it should set the
      // opacity back to 1
      const scrollY = window.screenY;
      if (homeNav && homeNav.current && scrollY <= 50) {
         controls.start({ display: 'flex' });
         opacity.set(1);
      }
   }, [homeNav, controls, opacity]);

   // const initPageLoad = (type: 'lock' | 'unlock') => {
   //    const styles =
   //       type === 'lock' ? { overflow: 'hidden', height: '100%' } : { overflow: '', height: '' };
   //    Object.assign(document.documentElement.style, styles);
   //    Object.assign(document.body.style, styles);
   // };

   // useLayoutEffect(() => {
   //    // on page reload the screen always start at the top
   //    if (pathName === '/' && homeNav && homeNav.current) {
   //       // window.scroll({
   //       //    top: 0,
   //       //    behavior: 'instant',
   //       // });

   //       initPageLoad('lock');

   //       let timer: NodeJS.Timeout;

   //       // Unlock scroll after 1200ms if on the home section
   //       timer = setTimeout(() => initPageLoad('unlock'), 1100);

   //       // Cleanup function to clear the timer
   //       return () => {
   //          clearTimeout(timer);
   //       };
   //    }
   // }, [pathName, homeNav]);

   return (
      <FronPageLayout ref={ref} id='home'>
         {/* canvas not displayed in smaller screens */}
         {isSizeBiggerThanMid && (
            <Suspense fallback={<div className='fixed inset-0 sky-fade-gradient -z-10'></div>}>
               <motion.div
                  style={{
                     opacity: opacity,
                  }}
                  animate={controls}
                  initial={{ display: 'block' }}
                  className={classNames(
                     isInView ? 'fixed' : 'invisible',
                     'inset-0 sky-fade-gradient -z-10'
                  )}
               >
                  <Canvas ref={canvasRef} />
                  {children}
               </motion.div>
            </Suspense>
         )}
         <FrontCoverDescriptionWrapper
            title={
               <div>
                  <span>{'Paul |'}</span>
                  <br />
                  <span>Full-stack Developer</span>
               </div>
            }
            description={[
               // "I'm a self-taught developer. I've navigated the tech landscape through hands-on experience.",
               "I'm a self-taught developer. I've",
               'navigated the tech landscape through hands-on experience.',
            ]}
         />
      </FronPageLayout>
   );
};

export default FrontPage;
