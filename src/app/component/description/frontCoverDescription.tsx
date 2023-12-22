import clsx from 'clsx';
import { pacifico, montserratAlternatives } from '../../fonts';
import ContactIcons from '../contact/icons/contactIcons';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Waves from '../svg/wave';

interface Main {
   title: React.ReactElement;
   // title: string;
   className?: string;
}

interface Description extends Main {
   description: string;
   intro: string;
}

const MotionContactIcons = motion(ContactIcons);

const Title = ({ title, className }: Main) => {
   return (
      <motion.h1
         initial={{ y: -25, rotateY: 10, scale: 0.9, opacity: 0 }}
         animate={{ y: 0, rotateY: 0, scale: 1, opacity: 1 }}
         transition={{
            type: 'spring',
            stiffness: 50,
            damping: 10,
            delay: 0.4,
            duration: 0.5,
            ease: 'backInOut',
         }}
         className={clsx(className)}
      >
         {title}
      </motion.h1>
   );
};

const Intro = ({ intro }: { intro: string }) => {
   return (
      <motion.p
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.5, ease: 'easeInOut' }}
         className='text-base lg:text-lg font-serif pl-4 my-3 lg:mb-5'
      >
         {intro}
      </motion.p>
   );
};

const Description = ({ description }: { description: string }) => {
   return (
      <motion.div
         initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
         animate={{ opacity: 1, scale: 1, rotate: 0 }}
         transition={{ delay: 0.8, duration: 0.7, type: 'spring', stiffness: 120 }}
         // transition={{ delay: 0.8, duration: 0.5 }}
         className='py-2 px-10 sm:pl-6 sm:pr-14 md:py-8 md:pl-10 md:pr-48 md:tracking-wide lg:py-8 lg:pr-[35%] xl:pr-[40%]'
      >
         <p className='text-xl font-sans tracking-wide text-gray-800 lg:leading-relaxed xl:text-3xl'>
            {description}
         </p>
      </motion.div>
   );
};

export const FrontCoverDescription = (props: Description) => {
   const [ready, setReady] = useState(false);

   // for contact motions it wont work unless setting timeout
   // and so forcing a delay here
   useEffect(() => {
      const timer = setTimeout(() => {
         setReady(true);
      }, 1000);

      return () => clearTimeout(timer);
   }, []);

   return (
      <main>
         <div className='absolute top-[23%] left-0 px-6 lg:px-16 lg:top-[10%]'>
            <div className='relative md:flex md:flex-col md:w-full md:h-full'>
               <div className='relative md:col-span-1 md:h-full md:w-full top-0 mb-4 lg:mb-8'>
                  <Intro intro={props.intro} />
                  <Title className=' text-5xl md:text-6xl lg:text-8xl' title={props.title} />
                  <div className='mt-6 lg:mt-10 items-center justify-start inline-flex'>
                     {ready && (
                        <MotionContactIcons
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           transition={{ duration: 1, ease: 'easeIn' }}
                           displayEmail={true}
                           stroke='black'
                           strokeWidth={1}
                           iconColor='hover:stroke-blue-800 hover:fill-blue-800'
                           emailColor='text-black dark:text-black hover:text-blue-800 '
                        />
                     )}
                  </div>
               </div>
               <Description description={props.description} />
            </div>
         </div>
      </main>
   );
};
