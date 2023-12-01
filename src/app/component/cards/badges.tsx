import React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { BasicCardProps } from '@/app/library/@types';

interface ProjectBadgesProps extends BasicCardProps {
   badges: string[];
}

const ProjectBadges = ({ badges, index, isOdd }: ProjectBadgesProps) => {
   return (
      <motion.ul
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.7 }}
         className={classNames(
            isOdd(index) ? 'lg:items-end lg:justify-end' : 'lg:items-start lg:justify-start',
            'flex flex-row gap-x-1 overflow-auto'
         )}
         role='list'
      >
         {badges.map((badge, badgeIndex) => (
            <li
               key={badgeIndex}
               aria-label={badge}
               className='inline-flex flex-wrap items-center rounded-full bg-gray-100 md:px-2 py-1 text-sm font-medium text-blue-500'
            >
               {badge}
            </li>
         ))}
      </motion.ul>
   );
};

export default ProjectBadges;
