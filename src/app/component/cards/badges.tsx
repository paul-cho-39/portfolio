import React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';

interface ProjectBadgesProps {
   badges: string[];
   isOdd: boolean;
}

const ProjectBadges = ({ badges, isOdd }: ProjectBadgesProps) => {
   return (
      <motion.ul
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.7 }}
         className={classNames(
            isOdd ? 'lg:items-end lg:justify-end' : 'lg:items-start lg:justify-start',
            'flex flex-row gap-x-2 overflow-auto'
         )}
         role='list'
      >
         {badges.map((badge, badgeIndex) => (
            <li
               aria-label={badge}
               className='inline-flex flex-wrap items-center rounded-full bg-gray-100 md:px-2 py-1 text-sm font-medium text-blue-800'
               key={badgeIndex}
            >
               {badge}
            </li>
         ))}
      </motion.ul>
   );
};

export default ProjectBadges;
