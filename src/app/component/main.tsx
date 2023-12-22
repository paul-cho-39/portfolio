import React, { Suspense, lazy, useState } from 'react';
import FronPageLayout from './layouts/home/frontSectionLayout';
import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import {
   useAnimation,
   useScroll,
   motion,
   useMotionValueEvent,
   useMotionValue,
   useInView,
} from 'framer-motion';

import { useDisableBreakPoints } from '@/app/library/hooks/useDisableBreakPoints';
import { FrontCoverDescription } from './description/frontCoverDescription';
import { ArrowDown } from './illustrator/arrowDown';
import classNames from 'classnames';
import useDarkTheme from '../library/hooks/useDarkTheme';
import { NavigationParams } from '../constants';
// import dynamic from 'next/dynamic';
// import WindowCanvas from './effects/scene';

const OPACITY_THRESHOLD = 0.15;
const SCROLL_THRESHOLD = 0.55;

// const Canvas = dynamic(() => import('./effects/scene'));
const Canvas = lazy(() => import('./effects/scene'));

const FrontPage = ({
   homeNav,
   children,
}: {
   homeNav: NavigationParams | undefined;
   children?: React.ReactNode;
}) => {
   const ref = useRef<HTMLDivElement>(null);
   const isMediumDisabled = useDisableBreakPoints();
   const { theme, setTheme } = useDarkTheme();
   const path = usePathname();
   const router = useRouter();

   const isInView = useInView(ref, {
      margin: '-300px',
   });

   const controls = useAnimation();
   const { scrollY } = useScroll();
   const opacity = useMotionValue(1);

   useMotionValueEvent(scrollY, 'change', (latest) => {
      if (!ref.current || !isInView) return;

      const sectionHeight = ref.current?.scrollHeight;
      const scrollPercentage = Math.max((sectionHeight - latest) / sectionHeight, 0);

      if (!homeNav || (homeNav && !homeNav.current)) {
         // detach the entire component from the tree

         console.log('IT IS NOT HOME ANYMORE');
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

   useEffect(() => {
      /**
       * light mode is the default mode
       * inside home path there is no option to toggle
       * when the path is home set it back to the default theme
       */
      if (!path || path !== '/') return;

      setTheme('light');

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [path, theme]);

   const canvasRef = useRef<HTMLCanvasElement | null>(null);
   const [isLoaded, setIsLoaded] = useState(false);

   useEffect(() => {
      if (ref.current) {
         // loading the entire component when it finishes rendering
         setIsLoaded(true);
      }
   }, []);

   return (
      <FronPageLayout ref={ref} id='home'>
         <Suspense fallback={<div></div>}>
            {isLoaded && (
               <>
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
                     {/* <Suspense fallback={<span>Loading...</span>}> */}
                     {/* <Canvas /> */}
                     <Canvas ref={canvasRef} />
                     {children}
                  </motion.div>
               </>
            )}
         </Suspense>

         <FrontCoverDescription
            intro={"Hello there! 👋🏼  I'm"}
            title={
               <>
                  <span>{'Paul |'}</span>
                  <br />
                  <span>Full-stack Developer</span>
               </>
            }
            description={
               "I'm a self-taught developer, I've navigated the tech landscape through hands-on experience."
            }
         />
         {isMediumDisabled && <ArrowDown />}
      </FronPageLayout>
   );
};

export default FrontPage;
