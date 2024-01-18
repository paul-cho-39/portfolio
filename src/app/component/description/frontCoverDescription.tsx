import clsx from 'clsx';
import ContactIcons from '../contact/icons/contactIcons';
import { Variants, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import AnimatedDescription from './animatedDescription';

interface Main {
   title: React.ReactElement;
   // title: string;
   className?: string;
}

interface Description extends Main {
   description: string[];
   // intro: React.ReactElement[];
}

const MOTION_TIMER_DELAY = 650;
const MotionContactIcons = motion(ContactIcons);

/**
 * @see link https://www.framer.com/help/articles/guide-to-lighthouse-scores/ for explaining why LCP (Largest Contentful Paint) will always get low
 * score
 */
const Title = ({ title, className }: Main) => {
   return (
      <motion.h1
         initial={{ x: -35, rotateY: 15, scale: 0.85, opacity: 0 }}
         animate={{ x: 0, rotateY: 0, scale: 1, opacity: 1 }}
         transition={{
            type: 'spring',
            stiffness: 40,
            damping: 10,
            duration: 0,
         }}
         className={clsx(className)}
      >
         {title}
      </motion.h1>
   );
};

/** No animation on the intro */
const Intro = () => {
   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ ease: 'easeIn', duration: 0.2 }}
         className='text-base lg:text-lg font-serif pl-4 my-3 lg:mb-5'
      >
         <span>Hello there!</span>
         <span>👋🏼</span>
         <span>{"I'm"}</span>
      </motion.div>
   );
};

export const FrontCoverDescriptionWrapper = (props: Description) => {
   const [ready, setReady] = useState(false);

   // for contact motions it wont work unless setting timeout
   // and so forcing a delay here
   useEffect(() => {
      const timer = setTimeout(() => {
         setReady(true);
      }, MOTION_TIMER_DELAY);

      return () => clearTimeout(timer);
   }, []);

   const MOTION_MS = MOTION_TIMER_DELAY / 1000;

   return (
      <div>
         <div className='absolute top-[23%] left-0 px-6 lg:px-16 lg:top-[10%] text-black dark:text-black'>
            <div className='relative md:flex md:flex-col md:w-full md:h-full'>
               <div className='relative md:col-span-1 md:h-full md:w-full top-0 mb-4 lg:mb-8'>
                  <Intro
                  // intro={props.intro}
                  />
                  <Title className=' text-5xl md:text-6xl lg:text-8xl' title={props.title} />
                  <div className='mt-6 lg:mt-10 items-center justify-start inline-flex'>
                     {ready ? (
                        <MotionContactIcons
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           transition={{ duration: 1, delay: 1, ease: 'easeIn' }}
                           displayEmail={true}
                           stroke='black'
                           strokeWidth={1}
                           iconColor='hover:stroke-blue-800 hover:fill-blue-800'
                           emailColor='text-black dark:text-black hover:text-blue-800 '
                        />
                     ) : (
                        // Placeholder div that should have the same size as 'Envelope' if displayed
                        // By doing this it will prevent layout shift
                        <div>
                           <div className='w-8 h-8 lg:w-9 lg:h-9 bg-transparent'></div>
                        </div>
                     )}
                  </div>
               </div>
               {/* <Description description={props.description} /> */}
               <AnimatedDescription
                  isSingleLine={true}
                  descriptions={props.description}
                  delay={MOTION_MS}
               />
            </div>
         </div>
      </div>
   );
};
