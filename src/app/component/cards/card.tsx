import classNames from '@/app/library/helper';
import { GithubIcon } from '../fab/contacts';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useDisableBreakPoints } from '@/app/library/hooks/useDisableBreakPoints';

import { ArrowTopRightOnSquareIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { SourceCode } from './contents';
import { motion, Variants } from 'framer-motion';
import { ProjectImage, ProjectImageProps } from './image';
import { Divider } from '../divider';

export interface ProjectsProps {
   title: string;
   section: string;
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

   const [isHovered, setIsHovered] = useState<ProjectImageProps['isHovered']>({
      idx: null,
      github: false,
      project: false,
   });
   const isDisabled = useDisableBreakPoints();
   console.log('is it disabled?: ', isDisabled);

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

   const isSameIndex = (idx: number, type: 'github' | 'project') =>
      isHovered.idx === idx && isHovered[type];

   return (
      <>
         {projects.map((project: ProjectsProps, index: number) => (
            <motion.article
               key={index}
               initial='offscreen'
               whileInView='onscreen'
               viewport={{ once: true, margin: '-16%' }}
               className={classNames(
                  isOdd(index) ? 'lg:flex-row-reverse ' : 'lg:flex-row',
                  'mx-auto flex w-full flex-col items-center mb-2 lg:mb-0'
               )}
            >
               <div className={classNames('lg:w-full lg:max-w-4xl lg:mb-6 xl:mb-8 py-2')}>
                  <div
                     className={classNames(
                        isOdd(index) ? 'lg:flex-row-reverse ' : 'lg:flex-row',
                        'flex flex-col px-6 py-2'
                     )}
                  >
                     <ProjectImage
                        src={project.image}
                        alt={project.title}
                        isHovered={isHovered}
                        index={index}
                        setIsHovered={setIsHovered}
                        title={project.title}
                     />

                     {/* CONTENTS HERE -- maybe when hovered show it here*/}
                     <motion.div
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: true }}
                        className={classNames(
                           'lg:max-w-2xl lg:-px-6 xl:max-w-xl ',
                           'flex-grow items-center justify-start align-top self-start w-full',
                           'md:py-2 lg:mx-4 '
                        )}
                     >
                        <motion.div
                           variants={headerVariants}
                           className={classNames(
                              isOdd(index) ? 'lg:text-right' : 'lg:text-left',
                              'md:pb-4 flex flex-col w-full'
                           )}
                        >
                           <h3
                              className={classNames(
                                 // isOdd(index) ? 'lg:text-left' : 'lg:text-right',
                                 'font-serif text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-medium z-10'
                              )}
                           >
                              {project.title}
                           </h3>
                           <motion.h4 className='w-full font-serif lg:text-lg capitalize z-10'>
                              {isSameIndex(index, 'github') ? (
                                 <motion.div
                                    layout
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
                                 >
                                    View source code
                                    <ArrowRightIcon className='inline w-6 h-4' />
                                 </motion.div>
                              ) : isSameIndex(index, 'project') ? (
                                 <motion.div
                                    layout
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
                                 >
                                    View project
                                    <ArrowRightIcon className='inline w-6 h-4' />
                                 </motion.div>
                              ) : (
                                 <motion.span
                                    initial={{ opacity: 1 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                 >
                                    {project.section}
                                 </motion.span>
                              )}
                           </motion.h4>
                        </motion.div>

                        {/* description */}
                        <motion.p
                           variants={headerVariants}
                           aria-label={project.description}
                           className={classNames(
                              isOdd(index) ? 'lg:text-right' : 'lg:text-left',
                              'font-serif text-lg lg:mb-4 tracking-wide leading-5 py-2 md:leading-6 lg:leading-7 lg:block'
                           )}
                        >
                           {project.description}
                        </motion.p>
                        {/* ... */}
                        <motion.ul
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           transition={{ duration: 0.7 }}
                           className={classNames(
                              isOdd(index)
                                 ? 'lg:items-end lg:justify-end'
                                 : 'lg:items-start lg:justify-start',
                              'flex flex-row gap-x-2 overflow-auto'
                           )}
                           role='listitem'
                        >
                           {project.badge.map((badge, badgeIndex) => (
                              <li
                                 aria-label={badge}
                                 className='inline-flex flex-wrap items-center rounded-full bg-gray-100 md:px-2 py-1 text-sm font-medium text-blue-800'
                                 key={badgeIndex}
                              >
                                 {badge}
                              </li>
                           ))}
                        </motion.ul>
                        {/* <div className='absolute inset-0 bg-blue-500 lg:hidden'> */}
                        <div className='flex flex-row items-start justify-start my-2 gap-x-2 lg:hidden'>
                           <Link
                              // className='my-2'
                              aria-label={`View source code for ${project.title}`}
                              href={'/'}
                           >
                              <GithubIcon className='w-6 h-6' />
                           </Link>
                           <Link className='' href={'/'}>
                              <ArrowTopRightOnSquareIcon className='w-6 h-6' />
                           </Link>
                        </div>
                        {/* </div> */}
                     </motion.div>
                  </div>
               </div>
            </motion.article>
         ))}
      </>
   );
};

export default Cards;
