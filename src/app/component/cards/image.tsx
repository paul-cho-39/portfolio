import Link from 'next/link';
import { GithubIcon } from '../contact/icons';
import React, { Dispatch, ImgHTMLAttributes, SetStateAction } from 'react';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { motion, MotionProps, Variants } from 'framer-motion';
import { ProjectActionsProps } from './links';
import { useDisableBreakPoints } from '@/app/library/hooks/useDisableBreakPoints';
import Image from 'next/image';

export type ProjectImageProps = {
   index: number;
   isHovered: { idx: number | null; github: boolean; project: boolean };
   setIsHovered: Dispatch<SetStateAction<ProjectImageProps['isHovered']>>;
   src: string;
   alt: string;
} & ProjectActionsProps;

const ProjectImage = ({
   title,
   index,
   isHovered,
   setIsHovered,
   githubUrl,
   projectUrl,
   src,
   alt,
}: // ...props
ProjectImageProps) =>
   // props?: ImageProps
   {
      const isLargerThanMed = useDisableBreakPoints();
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

      const handleHoverImage = (type: 'github' | 'project' | 'none', i: number | null) => {
         const newState: ProjectImageProps['isHovered'] = { idx: i, github: false, project: false };

         if (type !== 'none') {
            // newState.idx = i;
            newState[type] = true;
         }

         setIsHovered(newState);
      };

      const getImageSize = () => {
         if (isLargerThanMed) return;

         return {
            width: 250,
            height: 175,
         };
      };

      return (
         <motion.div
            variants={imgVariants}
            viewport={{ once: true }}
            className='relative group w-full sm:w-[29.6rem] md:w-[31.6rem] lg:max-w-md lg:flex-none lg:w-[24rem] xl:w-[28rem] overflow-hidden'
         >
            {isLargerThanMed ? (
               <Image
                  fill={true}
                  className={classNames(
                     'rounded-lg transform group-hover:opacity-60 group-hover:scale-110 group-hover:rounded-3xl transition-all duration-500 ease-in-out'
                  )}
                  alt={alt}
                  src={src}
               />
            ) : (
               <Image
                  width={200}
                  height={250}
                  sizes='100%'
                  style={{
                     width: '100%',
                     height: '100%',
                  }}
                  fill={false}
                  objectFit='cover'
                  alt={alt}
                  src={src}
                  className='rounded-lg transform group-hover:opacity-60 group-hover:scale-110 group-hover:rounded-3xl transition-all duration-500 ease-in-out'
               />
            )}
            <div className='absolute inset-0 h-full w-full grid grid-rows-2 opacity-0 md:group-hover:opacity-95 transition-opacity duration-150 ease-in'>
               <Link
                  // className='row-span-1 border-b-[0.5px] border-slate-800'
                  className={classNames(
                     isHovered && isHovered.github ? 'opacity-80' : 'opacity-20',
                     'row-span-1 border-b-[0.5px] border-slate-800 z-30'
                  )}
                  href={githubUrl}
                  target='_blank'
                  aria-label={`View source code for ${title}`}
                  onMouseEnter={() => handleHoverImage('github', index)}
                  onMouseLeave={() => handleHoverImage('none', null)}
               >
                  <GithubIcon className='absolute top-2 right-2 w-8 h-8 ' />
               </Link>
               <Link
                  className={classNames(
                     isHovered && isHovered.project ? 'opacity-80' : 'opacity-20',
                     'row-span-2  z-30'
                  )}
                  href={`/projects/${projectUrl}`}
                  aria-label={`View project ${title}`}
                  onMouseEnter={() => handleHoverImage('project', index)}
                  onMouseLeave={() => handleHoverImage('none', null)}
               >
                  <ArrowTopRightOnSquareIcon className='absolute top-[53%] right-2 w-8 h-8 ' />
               </Link>
            </div>
         </motion.div>
      );
   };

export default ProjectImage;
