import Link from 'next/link';
import { GithubIcon } from '../contact/icons';
import React, { Dispatch, ImgHTMLAttributes, SetStateAction } from 'react';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { motion, MotionProps, Variants } from 'framer-motion';
import { ProjectActionsProps } from './links';

export type ProjectImageProps = {
   index: number;
   isHovered: { idx: number | null; github: boolean; project: boolean };
   setIsHovered: Dispatch<SetStateAction<ProjectImageProps['isHovered']>>;

   // handleHoverImage: (type: 'github' | 'project' | 'none') => void;
} & ImgHTMLAttributes<HTMLImageElement> &
   ProjectActionsProps;

export const ProjectImage = ({
   title,
   index,
   isHovered,
   setIsHovered,
   githubUrl,
   projectUrl,
   ...props
}: ProjectImageProps) =>
   // props?: ImageProps
   {
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

      return (
         <motion.div
            variants={imgVariants}
            viewport={{ once: true }}
            className='relative group w-full sm:w-[29.6rem] md:w-[31.6rem] lg:max-w-md lg:flex-none lg:w-[24rem] xl:w-[28rem] overflow-hidden'
         >
            {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
            <img
               // className='lg:absolute lg:inset-0 h-full w-full object-cover rounded-lg transform group-hover:opacity-60 group-hover:scale-110 group-hover:rounded-3xl transition-all duration-500 ease-in-out'
               className='h-full w-full object-cover rounded-lg transform group-hover:opacity-60 group-hover:scale-110 group-hover:rounded-3xl transition-all duration-500 ease-in-out'
               {...props}
            />

            <div className='absolute inset-0 h-full w-full grid grid-rows-2 opacity-0 group-hover:opacity-95 transition-opacity duration-150 ease-in'>
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

// initial idea:
// when hovered, github and link icons will appear
// the icons should be absolute and have lower z-index
// once it is hovered, the opacity of image lowers and the hover button appears
// use isHovered state then on the bottom small <p>show project</p>

// TWO THINGS TO FIX:
