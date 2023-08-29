import { useEffect, useRef } from 'react';
import WindowCanvas from '../effects/scene';
import { FrontCoverDescription } from '../frontCover';
import { ArrowDown } from '../illustrator/arrowDown';

import {
   useAnimation,
   useScroll,
   motion,
   useMotionValueEvent,
   useMotionValue,
} from 'framer-motion';

const OPACITY_THRESHOLD = 0.2;

const lerp = (a: number, b: number, n: number) => {
   return (1 - n) * a + n * b;
};

const FronPageLayout = ({ children }: { children: React.ReactNode }) => {
   // if detecting scroll, change the position to fixed and then change it to
   // fixed;
   return (
      <div
         style={{
            width: '100%',
            height: '100vh',
         }}
         className='sky-gradient relative inset-0 z-20'
      >
         {children}
      </div>
   );
};

const FrontPage = () => {
   const ref = useRef<HTMLSelectElement>(null);

   const controls = useAnimation();
   const { scrollY } = useScroll();
   const opacity = useMotionValue(1);

   let currentOpacity = 1;
   useMotionValueEvent(scrollY, 'change', (latest) => {
      if (ref.current) {
         const sectionHeight = ref.current?.scrollHeight;
         console.log('Latest Scroll:', latest);
         console.log('Section Height:', sectionHeight);
         console.log('******************');
         const scrollPercentage = Math.max((sectionHeight - latest) / sectionHeight, 0);

         const targetOpacity = Math.pow(scrollPercentage, 1.5);

         console.log('Scroll Percentage:', scrollPercentage);
         console.log('-------------------');

         currentOpacity = lerp(currentOpacity, targetOpacity, 0.25);

         opacity.set(currentOpacity);

         console.log('Target Opacity:', targetOpacity);
         console.log('******************');

         if (currentOpacity <= OPACITY_THRESHOLD) {
            controls.start({ display: 'none' });
         } else {
            controls.start({ display: 'block' });
         }
      }
   });

   return (
      <section ref={ref} id='front_page'>
         <FronPageLayout>
            <motion.div
               style={{ opacity: opacity }}
               animate={controls}
               initial={{ display: 'block' }}
               className='fixed inset-0 sky-fade-gradient -z-10'
            >
               <WindowCanvas />
            </motion.div>
            <FrontCoverDescription
               main={
                  <>
                     <span>{'Paul |'}</span>
                     <br />
                     <span>Software Engineer</span>
                  </>
               }
               description={
                  "I'm a self-taught full-stack developer, I've navigated the tech landscape through hands-on experience. My journey into programming has been driven by curiosity and a passion for solving real-world problems"
               }
            />
            {/* if opacity is down at certain thrshold then this should not appear */}
            <ArrowDown />
         </FronPageLayout>
      </section>
   );
};

export default FrontPage;
