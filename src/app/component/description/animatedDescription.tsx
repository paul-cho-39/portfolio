import classNames from 'classnames';
import { Variants, motion } from 'framer-motion';
import { Fragment } from 'react';

interface AnimatedDescriptionProps {
   descriptions: string[];
   isSingleLine?: boolean;
   delay?: number;
   className?: string;
}

const AnimatedDescription = ({
   delay,
   descriptions,
   isSingleLine,
   className,
}: AnimatedDescriptionProps) => {
   const containerVariants: Variants = {
      hidden: {
         opacity: 0,
         x: -2,
         y: 20,
      },
      visible: {
         opacity: 1,
         x: 0,
         y: 0,
         transition: {
            ease: 'easeIn',
            staggerChildren: 0.03,
            when: 'beforeChildren',
            delay: delay || 0,
         },
      },
   };

   const childVariants: Variants = {
      hidden: {
         opacity: 0,
         x: -2,
         y: 20,
      },
      visible: {
         opacity: 1,
         x: 0,
         y: 0,
         transition: { duration: 0.2 },
      },
   };

   return (
      <motion.div variants={containerVariants} initial='hidden' animate='visible'>
         <div className={classNames(isSingleLine ? 'flex flex-row items-start flex-wrap' : '')}>
            {descriptions.map((item, index) => (
               <Fragment key={index}>
                  <motion.p
                     key={index}
                     className='text-xl font-sans tracking-wide text-gray-800 lg:leading-relaxed lg:text-2xl xl:text-3xl'
                     variants={childVariants}
                  >
                     {item}
                  </motion.p>
                  {/* creating white space if it is single line */}
                  {isSingleLine && index !== descriptions.length - 1 && (
                     <span aria-hidden='true'>&nbsp;</span>
                  )}
               </Fragment>
            ))}
         </div>
      </motion.div>
   );
};

export default AnimatedDescription;
