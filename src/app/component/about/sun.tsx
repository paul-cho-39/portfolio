import { easeIn, motion, useScroll, useTransform, useViewportScroll } from 'framer-motion';
import { RefObject, useRef } from 'react';
import Sun from '../svg/sun';

interface MotionSunProps {
   targetRef: RefObject<HTMLElement>;
   isMediumDisabled: boolean;
   containerRef?: RefObject<HTMLElement>; // should be viewport but in case it changes
}

// the sun is at the left corner of the screen
// and then it comes to the palm tree
// then the sun sets as it scrolls

const MotionSun = ({ targetRef, isMediumDisabled, containerRef }: MotionSunProps) => {
   const { scrollYProgress } = useScroll({
      target: targetRef,
      axis: 'y',
      // // container:
      // // offset is not recognized here
      // @ts-expect-error
      offset: ['start end', '150vh end'],
   });

   // SCALE
   const scaleX = useTransform(scrollYProgress, [0, 0.2, 0.5], ['80%', '120%', '150%']);
   const scaleY = useTransform(scrollYProgress, [0, 0.2, 0.5], ['80%', '120%', '150%']);

   // TRANSLATE
   const translateX = useTransform(
      scrollYProgress,
      [0, 0.25, 0.5, 0.75],
      ['-345%', '-200%', '-50%', '72%'],
      {
         ease: easeIn,
      }
   );
   const translateY = useTransform(
      scrollYProgress,
      [0, 0.2, 0.4, 0.5, 0.65, 0.8, 0.9],
      ['-345%', '-225%', '-120%', '30%', '60%', '300%', '450%'],
      {
         ease: easeIn,
      }
   );
   // CURRENT IS 0.4888

   // OPACITY AND BOX SHADOW
   const opacity = useTransform(
      scrollYProgress,
      [0, 0.3, 0.65, 0.8, 0.9],
      [1, 0.8, 0.65, 0.3, 0.1]
   );

   console.log('the scroll progress is: ', scrollYProgress);

   console.log('the SCROLL X IS: ', scaleX);
   console.log('the SCROLL Y IS:', scaleY);

   // display with screen size for medium or more
   if (!isMediumDisabled) {
      return null;
   }

   return (
      <motion.div
         style={{
            scaleX,
            scaleY,
            opacity,
            translateX,
            translateY,
         }}
      >
         <Sun />
         {/* <motion.svg
            style={{
               scaleX,
               scaleY,
               opacity,
               translateX,
               translateY,
               // backgroundImage: bgImage,
               // boxShadow: boxShadow,
               // boxShadow: '0px 0px 2px 1px yellow',
            }}
            className='w-12 h-12 rounded-full'
            viewBox='0 0 50 50'
            xmlns='http://www.w3.org/2000/svg'
         >
            <circle cx='25' cy='25' r='15' fill='yellow' />
         </motion.svg> */}
      </motion.div>
   );
};

export default MotionSun;
