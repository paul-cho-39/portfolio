import { forwardRef } from 'react';
import classNames from '@/app/library/helper';
import { motion } from 'framer-motion';
import { BasicCardProps } from '@/app/constants/@types';

interface ProjectDescription extends BasicCardProps {
   description: string;
}

const ProjectDescriptionRef = forwardRef<HTMLDivElement, ProjectDescription>((props, ref) => {
   const { description, index, isOdd } = props;
   return (
      <p
         ref={ref}
         aria-label={description}
         className={classNames(
            isOdd(index) ? 'lg:text-right' : 'lg:text-left',
            'font-serif text-lg lg:mb-4 tracking-wide leading-5 py-2 md:leading-6 lg:leading-7 lg:block'
         )}
      >
         {props.description}
      </p>
   );
});

ProjectDescriptionRef.displayName = 'ProjectDescriptionRef';
const MotionDescription = motion(ProjectDescriptionRef);
export default MotionDescription;
