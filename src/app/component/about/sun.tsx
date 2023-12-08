import { motion, useScroll, useTransform } from 'framer-motion';
import { RefObject, useRef } from 'react';

interface MotionSunProps {
   targetRef: RefObject<HTMLElement>;
   isMediumDisabled: boolean;
   containerRef?: RefObject<HTMLElement>; // should be viewport but in case it changes
}

// the sun is at the left corner of the screen
// and then it comes to the palm tree
// then the sun sets as it scrolls

const MotionSun = ({ targetRef, isMediumDisabled, containerRef }: MotionSunProps) => {
   const { scrollY, scrollYProgress } = useScroll({
      target: targetRef,
      axis: 'y',
      //   offset: ['start end', 'end end'],
   });

   // SCALE
   const scaleX = useTransform(
      scrollYProgress,
      [0, 0.2, 0.5, 0.75, 1],
      ['80%', '150%', '200%', '250%', '250%']
   );
   const scaleY = useTransform(
      scrollYProgress,
      [0, 0.2, 0.5, 0.75, 1],
      ['80%', '150%', '200%', '250%', '250%']
   );

   // TRANSLATE
   const translateX = useTransform(
      scrollYProgress,
      [0, 0.2, 0.3, 0.4, 0.75],
      ['-345%', '-150%', '20%', '50%', '100%']
   );
   const translateY = useTransform(
      scrollYProgress,
      [0, 0.2, 0.3, 0.4, 0.75, 0.85, 0.9, 1],
      ['-345%', '-250%', '-75%', '-20%', '150%', '300%', '450%', '550%']
   );

   // OPACITY
   const opacity = useTransform(scrollYProgress, [0, 0.5, 0.75, 0.8, 1], [1, 0.6, 0.3, 0.2, 0]);

   // display with screen size for medium or more
   if (isMediumDisabled) {
      return null;
   }

   return (
      <div
      //   ref={targetRef}
      >
         <motion.svg
            style={{
               scaleX: scaleX,
               scaleY: scaleY,
               opacity: opacity,
               translateX,
               translateY,
            }}
            className='w-10 h-10'
            viewBox='0 0 50 50'
            xmlns='http://www.w3.org/2000/svg'
         >
            <circle cx='25' cy='25' r='15' fill='yellow' />
         </motion.svg>
      </div>
   );
};

export default MotionSun;
