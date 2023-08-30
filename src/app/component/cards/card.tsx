import classNames from '@/app/library/helper';
import { GithubIcon } from '../fab/contacts';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useDisableBreakPoints } from '@/app/library/hooks/useDisableBreakPoints';

import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { SourceCode } from './contents';
import { motion, Variants } from 'framer-motion';

export interface ProjectsProps {
   title: string;
   image: string;
   description: string;
   url: string | undefined;
   github: string;
   badge: string[];
}

interface ProjectCardsProps {
   projects: ProjectsProps[];
   badgeColor?: '';
}

const Cards = ({ projects }: ProjectCardsProps) => {
   const el = useRef<HTMLDivElement>(null);
   const isOdd = (idx: number) => idx % 2 !== 0;

   const repositionByIndex = (idx: number) => {
      const maxStep = projects.length; // maximum step boundary
      const stepSize = 5; // step size in pixels
      let step;

      if (idx <= maxStep) {
         step = idx * stepSize;
      } else {
         step = (maxStep - (idx - maxStep)) * stepSize;
      }
      //   return `pl-${step}`;
      return step + 'rem';
   };

   const isDisabled = useDisableBreakPoints();

   useEffect(() => {
      if (!el.current) return;
   }, []);

   // TODO:
   // a) if it is flex it should come out a bit differently
   // b) image should come out from the bottom to up
   // c) card title comes from left to right (depending on flex)
   // d) card statement opacity
   const cardVariants: Variants = {
      offscreen: {
         y: -200,
         scale: 0.9,
         opacity: 0.5,
      },
      onscreen: {
         x: 0,
         scale: 1,
         opacity: 1,
         transition: {
            type: 'spring',
            bounce: 0.2,
            duration: 1,
         },
      },
   };

   return (
      <>
         {projects.map((project: ProjectsProps, index: number) => (
            <motion.article
               key={index}
               initial='offscreen'
               whileInView='onscreen'
               variants={cardVariants}
               // viewport={{ once: false, amount: 0.8 }}
               className={classNames(
                  isOdd(index) ? 'lg:flex-row-reverse ' : 'lg:flex-row',
                  'xl:px-20',
                  'mx-auto flex w-full flex-col items-center gap-x-16 mb-6 lg:mb-0 lg:items-stretch'
               )}
            >
               <div
                  className={classNames(
                     'group transform transition-all duration-300 ease-in-out lg:mb-24 xl:mb-28'
                  )}
               >
                  {/* <Link className='z-0 lg:pointer-events-none' href={'/'}> */}
                  <div
                     variants={cardVariants}
                     className={classNames(
                        isOdd(index) ? 'lg:flex-row-reverse ' : 'lg:flex-row',
                        'flex px-6 py-2'
                     )}
                  >
                     <div
                        className={classNames(
                           //    isOdd(index) ? 'lg:-ml-6' : 'lg:-mb-8',
                           //    '                           bg-gray-700',
                           '-mt-8 max-w-2xl lg:w-96 lg:flex-none '
                        )}
                     >
                        <div className='lg:relative top-2 lg:h-full md:-mx-8 lg:mx-0 lg:hover:drop-shadow-2xl lg:hover:shadow-gray-800 lg:group-hover:translate-y-0'>
                           <Link
                              className='lg:pointer-events-auto lg:cursor-pointer lg:hover:opacity-90 lg:hover:-translate-y-3 transition-all duration-300 '
                              href={'/'}
                           >
                              <img
                                 className='absolute inset-0  h-full w-full rounded-2xl object-cover opacity-30 lg:opacity-100 lg:shadow-2xl lg:h-[70%] xl:h-[85%] lg:hover:-translate-y-3 transition-all duration-300'
                                 src={project.image}
                                 alt={project.title}
                              />
                           </Link>
                        </div>
                     </div>

                     {/* CONTENTS HERE */}
                     <div
                        className={classNames(
                           'px-4 md:px-20 lg:max-w-2xl lg:-px-6 xl:max-w-xl ',
                           'flex-grow items-center justify-start align-top self-start '
                        )}
                     >
                        <div className='pb-4'>
                           <h3 className='font-serif text-2xl'>{project.title}</h3>
                        </div>

                        {/* description */}
                        <p className='font-medium mb-6 lg:mb-4 tracking-wide leading-5 md:leading-6 lg:leading-7'>
                           {project.description}
                        </p>
                        {/* ... */}
                        <ul
                           className='flex flex-row items-start justify-start gap-x-2 overflow-auto'
                           role='listitem'
                        >
                           {project.badge.map((badge, badgeIndex) => (
                              <li
                                 aria-label={badge}
                                 className='inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-blue-800'
                                 key={badgeIndex}
                              >
                                 {badge}
                              </li>
                           ))}
                        </ul>
                        <div className='flex flex-row items-start justify-start my-2 lg:hidden'>
                           <Link
                              className='my-2'
                              aria-label={`View source code for ${project.title}`}
                              href={'/'}
                           >
                              {/* link here */}
                              <GithubIcon className='block' width={25} height={25} />
                           </Link>
                        </div>
                     </div>
                  </div>
               </div>
               {/* numbering the project(?) / other details? */}
               {isDisabled && (
                  <SourceCode
                     isOdd={isOdd}
                     index={index}
                     aria-label={`View source code for ${project.title}`}
                  />
               )}
            </motion.article>
         ))}
      </>
   );
};

// const Cards = ({ projects }: ProjectCardsProps) => {
//    const el = useRef<HTMLDivElement>(null);
//    const isOdd = (idx: number) => idx % 2 !== 0;

//    const repositionByIndex = (idx: number) => {
//       const maxStep = projects.length; // maximum step boundary
//       const stepSize = 5; // step size in pixels
//       let step;

//       if (idx <= maxStep) {
//          step = idx * stepSize;
//       } else {
//          step = (maxStep - (idx - maxStep)) * stepSize;
//       }
//       //   return `pl-${step}`;
//       return step + 'rem';
//    };

//    const isDisabled = useDisableBreakPoints();

//    useEffect(() => {
//       if (!el.current) return;
//    }, []);

//    return (
//       <>
//          {projects.map((project: ProjectsProps, index: number) => (
//             <article
//                key={index}
//                className={classNames(
//                   isOdd(index) ? 'lg:flex-row-reverse ' : 'lg:flex-row',
//                   'xl:px-20',
//                   'mx-auto flex w-full flex-col items-center gap-x-16 mb-6 lg:mb-0 lg:items-stretch'
//                )}
//             >
//                <div
//                   className={classNames(
//                      'group transform transition-all duration-300 ease-in-out lg:mb-24 xl:mb-28'
//                   )}
//                >
//                   {/* <Link className='z-0 lg:pointer-events-none' href={'/'}> */}
//                   <div
//                      className={classNames(
//                         isOdd(index) ? 'lg:flex-row-reverse ' : 'lg:flex-row',
//                         'flex px-6 py-2'
//                      )}
//                   >
//                      <div
//                         className={classNames(
//                            //    isOdd(index) ? 'lg:-ml-6' : 'lg:-mb-8',
//                            //    '                           bg-gray-700',
//                            '-mt-8 max-w-2xl lg:w-96 lg:flex-none '
//                         )}
//                      >
//                         <div className='lg:relative top-2 lg:h-full md:-mx-8 lg:mx-0 lg:hover:drop-shadow-2xl lg:hover:shadow-gray-800 lg:group-hover:translate-y-0'>
//                            <Link
//                               className='lg:pointer-events-auto lg:cursor-pointer lg:hover:opacity-90 lg:hover:-translate-y-3 transition-all duration-300 '
//                               href={'/'}
//                            >
//                               <img
//                                  className='absolute inset-0  h-full w-full rounded-2xl object-cover opacity-30 lg:opacity-100 lg:shadow-2xl lg:h-[70%] xl:h-[85%] lg:hover:-translate-y-3 transition-all duration-300'
//                                  src={project.image}
//                                  alt={project.title}
//                               />
//                            </Link>
//                         </div>
//                      </div>

//                      {/* CONTENTS HERE */}
//                      <div
//                         className={classNames(
//                            'px-4 md:px-20 lg:max-w-2xl lg:-px-6 xl:max-w-xl ',
//                            'flex-grow items-center justify-start align-top self-start '
//                         )}
//                      >
//                         <div className='pb-4'>
//                            <h3 className='font-serif text-2xl'>{project.title}</h3>
//                         </div>

//                         {/* description */}
//                         <p className='font-medium mb-6 lg:mb-4 tracking-wide leading-5 md:leading-6 lg:leading-7'>
//                            {project.description}
//                         </p>
//                         {/* ... */}
//                         <ul
//                            className='flex flex-row items-start justify-start gap-x-2 overflow-auto'
//                            role='listitem'
//                         >
//                            {project.badge.map((badge, badgeIndex) => (
//                               <li
//                                  aria-label={badge}
//                                  className='inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-blue-800'
//                                  key={badgeIndex}
//                               >
//                                  {badge}
//                               </li>
//                            ))}
//                         </ul>
//                         <div className='flex flex-row items-start justify-start my-2 lg:hidden'>
//                            <Link
//                               className='my-2'
//                               aria-label={`View source code for ${project.title}`}
//                               href={'/'}
//                            >
//                               {/* link here */}
//                               <GithubIcon className='block' width={25} height={25} />
//                            </Link>
//                         </div>
//                      </div>
//                   </div>
//                </div>
//                {/* numbering the project(?) / other details? */}
//                {isDisabled && (
//                   <SourceCode
//                      isOdd={isOdd}
//                      index={index}
//                      aria-label={`View source code for ${project.title}`}
//                   />
//                )}
//             </article>
//          ))}
//       </>
//    );
// };

export default Cards;
