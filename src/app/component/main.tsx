import React, { lazy, Suspense } from 'react';
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

import { useDisableBreakPoints } from '@/app/library/hooks/useDisableBreakPoints';
import { FrontCoverDescription } from './description/frontCoverDescription';
import { ArrowDown } from './illustrator/arrowDown';
import classNames from 'classnames';
import useDarkTheme from '../library/hooks/useDarkTheme';
import { usePathname } from 'next/navigation';

const OPACITY_THRESHOLD = 0.15;
const SCROLL_THRESHOLD = 0.75;

const Canvas = lazy(() => import('./effects/scene'));

const FrontPage = ({ children }: { children?: React.ReactNode }) => {
   const ref = useRef<HTMLDivElement>(null);
   const isMediumDisabled = useDisableBreakPoints();
   const { theme, setTheme } = useDarkTheme();
   const path = usePathname();

   const isInView = useInView(ref, {
      margin: '-250px',
   });

   const controls = useAnimation();
   const { scrollY } = useScroll();
   const opacity = useMotionValue(1);
   let currentOpacity = 1;

   useMotionValueEvent(scrollY, 'change', (latest) => {
      if (!ref.current || !isInView) return;

      const sectionHeight = ref.current?.scrollHeight;
      const scrollPercentage = Math.max((sectionHeight - latest) / sectionHeight, 0);

      if (scrollPercentage < SCROLL_THRESHOLD) {
         const targetOpacity = Math.pow(scrollPercentage, 2.5);
         opacity.set(targetOpacity);

         if (currentOpacity <= OPACITY_THRESHOLD) {
            controls.start({ display: 'none' });
         } else {
            controls.start({ display: 'block' });
         }
      }
   });

   useEffect(() => {
      /**
       * light mode is the default mode
       * inside home path there is no option to toggle
       * and whenever the path is home set it back to the default theme
       */
      if (!path || path !== '/') return;

      setTheme('light');

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [path, theme]);

   return (
      // <section ref={ref} id='home'>
      <FronPageLayout ref={ref} id='home'>
         <motion.div
            style={{ opacity: opacity }}
            animate={controls}
            initial={{ display: 'block' }}
            className={classNames(
               isInView ? 'fixed' : 'invisible',
               'inset-0 sky-fade-gradient -z-10'
            )}
         >
            {/* TODO: better fallback  */}
            <Suspense fallback={<div>Loading...</div>}>
               {/* <Canvas /> */}
               {children}
            </Suspense>
         </motion.div>
         <FrontCoverDescription
            pre={"Hello there! 👋🏼  I'm"}
            main={
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
      // </section>
   );
};

export default FrontPage;
