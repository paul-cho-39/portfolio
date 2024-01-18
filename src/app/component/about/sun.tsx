import { easeIn, motion, useScroll, useTransform } from 'framer-motion';
import { RefObject, useRef } from 'react';
import Sun from '../svg/sun';

interface MotionSunProps {
   stateName: string;
   offset: string[];
   targetRef: RefObject<HTMLElement>;
   isMediumDisabled: boolean;
   containerRef?: RefObject<HTMLElement>; // should be viewport but in case it changes
}

// the sun is at the left corner of the screen
// and then it comes to the palm tree
// then the sun sets as it scrolls

const MotionSun = ({
   stateName,
   offset,
   targetRef,
   isMediumDisabled,
   containerRef,
}: MotionSunProps) => {
   const { scrollYProgress } = useScroll({
      layoutEffect: false,
      target: targetRef,
      axis: 'y',
      container: containerRef,
      offset: ['start end', '150vh end'],
   });

   // SCALE
   const scaleX = useTransform(scrollYProgress, [0, 0.2, 0.5], ['80%', '120%', '150%']);
   const scaleY = useTransform(scrollYProgress, [0, 0.2, 0.5], ['80%', '120%', '150%']);

   // TRANSLATE
   const translateX = useTransform(
      scrollYProgress,
      [0, 0.25, 0.5, 0.75, 0.9],
      ['0%', '17%', '36%', '75%', '90%'],
      {
         ease: easeIn,
      }
   );
   const translateY = useTransform(
      scrollYProgress,
      [0, 0.25, 0.5, 0.75, 0.9],
      ['0%', '20%', '35%', '50%', '70%'],
      {
         ease: easeIn,
      }
   );

   // OPACITY AND BOX SHADOW
   const opacity = useTransform(
      scrollYProgress,
      [0, 0.3, 0.65, 0.8, 0.9],
      [1, 0.8, 0.65, 0.3, 0.1]
   );

   // console.log(`Inside the COMPONENT ${stateName} the scroll progress is: `, scrollYProgress);

   console.log(`Inside the COMPONENT ${stateName} the SCROLL X IS: `, translateX);
   console.log(`Inside the COMPONENT ${stateName} the SCROLL Y IS:`, translateY);

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
         className='absolute inset-0'
      >
         <Sun />
      </motion.div>
   );
};

export default MotionSun;
