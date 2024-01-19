import React, { Suspense, lazy, useLayoutEffect, useState } from 'react';
import FronPageLayout from './layouts/home/frontSectionLayout';
import { useEffect, useRef } from 'react';

import {
   useAnimation,
   useScroll,
   motion,
   useMotionValueEvent,
   useMotionValue,
   useInView,
} from 'framer-motion';

import { FrontCoverDescriptionWrapper } from './description/frontCoverDescription';
import classNames from 'classnames';
import { NavigationParams } from '../constants';

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
   const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

   const unlockScroll = () => {
      document.documentElement.style.overflow = 'visible';
      document.body.style.overflow = 'visible';
      document.documentElement.style.height = '';
      document.body.style.height = '';
   };

   useLayoutEffect(() => {
      window.scroll({
         top: 0,
         behavior: 'instant',
      });

      let timer: NodeJS.Timeout;

      // Unlock scroll after 1200ms if on the home section
      timer = setTimeout(unlockScroll, 1000);

      // Cleanup function to clear the timer
      return () => {
         clearTimeout(timer);
      };
   }, []);

   return (
      <FronPageLayout ref={ref} id='home'>
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
