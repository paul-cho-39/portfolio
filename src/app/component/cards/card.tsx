import classNames from '@/app/library/helper';
import { GithubIcon } from '../fab/contacts';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useDisableBreakPoints } from '@/app/library/hooks/useDisableBreakPoints';

import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { SourceCode } from './contents';
import { motion, Variants } from 'framer-motion';
import { ProjectImage } from './image';

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

// TODO: for responsive design have to use javascript to get the correct responsive design for framer motion

const Cards = ({ projects }: ProjectCardsProps) => {
   const el = useRef<HTMLDivElement>(null);
   const isOdd = (idx: number) => idx % 2 !== 0;

   const isDisabled = useDisableBreakPoints();

   const imgVariants: Variants = {
      offscreen: {
         y: 150,
         opacity: 0,
      },
      onscreen: {
         y: 0,
         opacity: 1,
         transition: {
            duration: 0.8,
            type: 'spring',
            bounce: 0.1,
            stiffness: 85,
         },
      },
   };

   const headerVariants: Variants = {
      hidden: {
         x: '-2%',
         opacity: 0,
      },
      visible: {
         x: '0%',
         opacity: 1,
         transition: {
            delay: 0.4,
            duration: 0.5,
         },
      },
   };

   // TODO: whenever it is odd change the title to the end

   return (
      <>
         {projects.map((project: ProjectsProps, index: number) => (
            <motion.article
               key={index}
               initial='offscreen'
               whileInView='onscreen'
               viewport={{ once: true }}
               className={classNames(
                  isOdd(index) ? 'lg:flex-row-reverse ' : 'lg:flex-row',
                  // 'bg-red-500',
                  'gap-x-16 lg:items-stretch',
                  'mx-auto flex w-full flex-col items-center mb-6 lg:mb-0'
               )}
            >
               <div className={classNames('lg:w-full lg:max-w-4xl lg:mb-6 xl:mb-8 py-2')}>
                  <div
                     className={classNames(
                        isOdd(index) ? 'lg:flex-row-reverse ' : 'lg:flex-row',
                        'flex flex-col px-6 py-2'
                     )}
                  >
                     {/* <div
                        className={classNames(
                           'bg-gray-700',
                           '-mt-8 max-w-2xl lg:w-96 lg:flex-none '
                        )}
                     > */}
                     {/* here if the resolution is smaller then it wont work */}
                     {/* <div
                           // variants={imgVariants}
                           // viewport={{ once: true }}
                           className='lg:relative top-2 lg:h-full md:-mx-8 lg:mx-0 lg:hover:drop-shadow-2xl lg:hover:shadow-gray-800 lg:group-hover:translate-y-0'
                        >
                           <Link
                              className='lg:pointer-events-auto lg:cursor-pointer lg:hover:opacity-90 lg:hover:-translate-y-3 transition-all duration-300 '
                              href={'/'}
                           >
                              <img
                                 className='absolute inset-0  h-full w-full rounded-xl object-cover opacity-30 lg:opacity-100 lg:shadow-2xl lg:h-[70%] xl:h-[85%] lg:hover:-translate-y-3 transition-all duration-300'
                                 src={project.image}
                                 alt={project.title}
                              />
                           </Link>
                        </div> */}
                     <ProjectImage />
                     {/* </div> */}

                     {/* CONTENTS HERE -- maybe when hovered show it here*/}
                     <motion.div
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: true }}
                        className={classNames(
                           'px-4 lg:max-w-2xl lg:-px-6 xl:max-w-xl ',
                           'flex-grow items-center justify-start align-top self-start',
                           'md:py-2'
                        )}
                     >
                        <motion.div
                           variants={headerVariants}
                           className={classNames(
                              // isOdd(index) ? 'text-left' : 'text-right',
                              'pb-4 flex flex-col lg:flex-col-reverse'
                           )}
                           // className='pb-4 flex flex-col lg:flex-col-reverse'
                        >
                           <h3
                              className={classNames(
                                 isOdd(index) ? 'lg:text-left' : 'lg:text-right',
                                 'font-serif text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium'
                              )}
                              // className='font-serif text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium'
                           >
                              {project.title}
                           </h3>
                           <h4 className='font-serif lg:text-lg lg:text-center'>
                              Featured Project
                           </h4>
                        </motion.div>

                        {/* description */}
                        <motion.p
                           variants={headerVariants}
                           className='hidden font-serif text-lg lg:mb-4 tracking-wide leading-5 md:leading-6 lg:leading-7 lg:block'
                        >
                           {project.description}
                        </motion.p>
                        {/* ... */}
                        <motion.ul
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           transition={{ duration: 0.7 }}
                           className='flex flex-row items-start justify-start gap-x-2 overflow-auto'
                           role='listitem'
                        >
                           {project.badge.map((badge, badgeIndex) => (
                              <li
                                 aria-label={badge}
                                 className='inline-flex flex-wrap items-center rounded-full bg-gray-100 px-2 py-1 text-sm font-medium text-blue-800'
                                 key={badgeIndex}
                              >
                                 {badge}
                              </li>
                           ))}
                        </motion.ul>
                        {/* <div className='flex flex-row items-start justify-start my-2 lg:hidden'>
                           <Link
                              className='my-2'
                              aria-label={`View source code for ${project.title}`}
                              href={'/'}
                           >
                              <GithubIcon className='block' width={25} height={25} />
                           </Link>
                        </div> */}
                     </motion.div>
                  </div>
               </div>
               {/* numbering the project(?) / other details?
               {isDisabled && (
                  <SourceCode
                     isOdd={isOdd}
                     index={index}
                     aria-label={`View source code for ${project.title}`}
                  />
               )} */}
            </motion.article>
         ))}
      </>
   );
};

// const Cards = ({ projects }: ProjectCardsProps) => {
//    const el = useRef<HTMLDivElement>(null);
//    const isOdd = (idx: number) => idx % 2 !== 0;

//    const isDisabled = useDisableBreakPoints();

//    return (
//       <>
//          {projects.map((project: ProjectsProps, index: number) => (
//             <article
//                key={index}
//                className={classNames(
//                   isOdd(index) ? 'lg:flex-row-reverse ' : 'lg:flex-row',
//                   'mx-auto flex w-full flex-col items-center gap-x-16 mb-6 lg:mb-0 lg:items-stretch'
//                )}
//             >
//                <div
//                   className={classNames(
//                      'group transform transition-all duration-300 ease-in-out lg:mb-24 xl:mb-28'
//                   )}
//                >
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
//                         <div className='pb-4 flex flex-col-reverse'>
//                            <h3 className='font-serif text-2xl'>{project.title}</h3>
//                            <h4 className=''>Featured Project</h4>
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
