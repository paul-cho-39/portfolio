import { forwardRef } from 'react';

import classNames from 'classnames';
import { motion } from 'framer-motion';
import { ProjectImageProps } from './image';
import { ArrowRightIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { BasicCardProps } from '@/app/library/@types';
import Link from 'next/link';

interface SubtitleProps extends Pick<BasicCardProps, 'index'> {
   subtitle: string;
   isHovered: ProjectImageProps['isHovered'];
}

interface ProjectTitleProps extends SubtitleProps {
   title: string;
   projectUrl: string;
   isOdd: (index: number) => boolean;
}

const ProjectTitleRef = forwardRef<HTMLDivElement, ProjectTitleProps>((props, ref) => {
   const { index, isOdd, isHovered, subtitle, ...rest } = props;

   return (
      <div
         ref={ref}
         className={classNames(
            isOdd(index) ? 'lg:text-right' : 'lg:text-left',
            'md:pb-4 flex flex-col w-full'
         )}
      >
         <Title {...rest} />
         <Subtitle subtitle={subtitle} index={index} isHovered={isHovered} />
      </div>
   );
});

const Title = ({ title, projectUrl }: { title: string; projectUrl: string }) => {
   return (
      <h3 className='font-sans text-2xl md:text-3xl font-semibold z-10 pb-2 lg:pb-3'>
         <Link
            className='hover:text-blue-600'
            href={`/projects/${projectUrl}`}
            aria-label={`View project ${title}`}
         >
            {title}
         </Link>
      </h3>
   );
};

const Subtitle = ({ subtitle, index, isHovered }: SubtitleProps) => {
   const isSameIndex = (idx: number, type: 'github' | 'project') =>
      isHovered.idx === idx && isHovered[type];

   const isNotHovered = (idx: number) => {
      return isSameIndex(idx, 'github') || isSameIndex(idx, 'project');
   };
   return (
      <motion.h4 className='w-full font-sans lg:text-lg capitalize z-10'>
         {isSameIndex(index, 'github') ? (
            <motion.div
               layout
               className='text-blue-600'
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               aria-label='View Github repo'
               transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
            >
               View Github Repo
               <ArrowRightIcon className='inline w-6 h-4' />
            </motion.div>
         ) : isSameIndex(index, 'project') ? (
            <motion.div
               layout
               className='text-blue-600'
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               aria-label='View project'
               transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
            >
               View project
               <ArrowRightIcon className='inline w-6 h-4' />
            </motion.div>
         ) : (
            <motion.span
               initial={{
                  opacity: !isNotHovered(index) ? 1 : 0,
                  y: !isNotHovered(index) ? 0 : -20,
               }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
               aria-label={subtitle}
            >
               {subtitle}
            </motion.span>
         )}
      </motion.h4>
   );
};

ProjectTitleRef.displayName = 'ProjectTitleRef';
const MotionTitle = motion(ProjectTitleRef);
export default MotionTitle;
