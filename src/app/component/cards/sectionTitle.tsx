import { forwardRef } from 'react';

import classNames from 'classnames';
import { motion } from 'framer-motion';
import { ProjectImageProps } from './image';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { BasicCardProps } from '@/app/library/@types';

interface SubtitleProps extends Pick<BasicCardProps, 'index'> {
   subtitle: string;
   isHovered: ProjectImageProps['isHovered'];
}

interface ProjectTitleProps extends SubtitleProps {
   title: string;
   isOdd: (index: number) => boolean;
}

const ProjectTitleRef = forwardRef<HTMLDivElement, ProjectTitleProps>((props, ref) => {
   const { title, index, isOdd, isHovered, subtitle } = props;

   return (
      <div
         ref={ref}
         className={classNames(
            isOdd(index) ? 'lg:text-right' : 'lg:text-left',
            'md:pb-4 flex flex-col w-full'
         )}
      >
         <Title title={title} />
         <Subtitle subtitle={subtitle} index={index} isHovered={isHovered} />
      </div>
   );
});

const Title = ({ title }: { title: string }) => {
   return <h3 className='font-serif text-xl md:text-2xl font-medium z-10'>{title}</h3>;
};

const Subtitle = ({ subtitle, index, isHovered }: SubtitleProps) => {
   const isSameIndex = (idx: number, type: 'github' | 'project') =>
      isHovered.idx === idx && isHovered[type];

   const isNotHovered = (idx: number) => {
      return isSameIndex(idx, 'github') || isSameIndex(idx, 'project');
   };
   return (
      <motion.h4 className='w-full font-serif lg:text-lg capitalize z-10'>
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
