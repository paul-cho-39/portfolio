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
   useInView,
} from 'framer-motion';
import { lerp } from 'three/src/math/MathUtils';
import classNames from '@/app/library/helper';

const OPACITY_THRESHOLD = 0.15;
const SCROLL_THRESHOLD = 0.75;

const FronPageLayout = ({ children }: { children: React.ReactNode }) => {
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

   const isInView = useInView(ref, {
      margin: '-250px',
   });

   const controls = useAnimation();
   const { scrollY } = useScroll();
   const opacity = useMotionValue(1);
   let currentOpacity = 1;

   // TODO: make this a bit more smooth
   useMotionValueEvent(scrollY, 'change', (latest) => {
      if (!ref.current || !isInView) return;

      const sectionHeight = ref.current?.scrollHeight;
      const scrollPercentage = Math.max((sectionHeight - latest) / sectionHeight, 0);

      if (scrollPercentage < SCROLL_THRESHOLD) {
         // console.log('------*********************-------');
         // console.log('the current scroll percentage is: ', scrollPercentage);
         const targetOpacity = Math.pow(scrollPercentage, 2.5);
         // a better solution would be if it passes a certain threshold
         // then the opacity takes place?
         // console.log('the target opacity is: ', targetOpacity);

         currentOpacity = lerp(currentOpacity, targetOpacity, 0.2);

         // console.log('---------------------------------------');
         // console.log('the current opacity is then: ', currentOpacity);

         // opacity.set(currentOpacity);
         opacity.set(targetOpacity);

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
            {/* <motion.div
               style={{ opacity: opacity }}
               animate={controls}
               initial={{ display: 'block' }}
               className={classNames(
                  isInView ? 'fixed' : 'invisible',
                  'inset-0 sky-fade-gradient -z-10'
               )}
               // className='fixed inset-0 sky-fade-gradient -z-10'
            >
               <WindowCanvas />
            </motion.div> */}
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
            <ArrowDown />
         </FronPageLayout>
      </section>
   );
};

export default FrontPage;
