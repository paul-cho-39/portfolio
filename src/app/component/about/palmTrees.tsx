import { Variants, motion, useAnimation, useInView } from 'framer-motion';
import { PalmTrees } from '../svg/palm-trees';

interface MotionPalmTreesProps {
   isMediumDisabled: boolean;
}

const MotionPalmTrees = ({ isMediumDisabled }: MotionPalmTreesProps) => {
   // since it is absolute have to adjust the number here
   const fadeInUp: Variants = {
      hidden: { opacity: 0, y: -660, rotate: -5 },
      visible: {
         opacity: 1,
         y: -700,
         rotate: 0,
         transition: {
            type: 'spring',
            bounce: 0.3,
            delay: 0.1,
            duration: 0.4,
         },
      },
   };

   // disabled when the screen is smaller than medium
   if (!isMediumDisabled) {
      return null;
   }

   return (
      <motion.div viewport={{ once: true, margin: '200px' }} initial='hidden' whileInView='visible'>
         <motion.div variants={fadeInUp}>
            <PalmTrees className='absolute rotate-[6deg] opacity-30 w-[24rem] h-[24rem] top-6  -right-32 xl:top-4 xl:-right-24' />
            <PalmTrees className='absolute -rotate-[6deg] opacity-30 w-[24rem] h-[24rem] top-6 -left-32  xl:top-4 xl:-left-24 -scale-x-100' />
         </motion.div>
      </motion.div>
   );
};

export default MotionPalmTrees;
