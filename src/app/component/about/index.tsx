import { useRef } from 'react';
import dynamic from 'next/dynamic';

import { useDisableBreakPoints } from '@/app/library/hooks/useDisableBreakPoints';
import { SectionHeader } from '../headers/sectionHeader';

import SkillWrap from './skills';
import MotionPalmTrees from './palmTrees';
import AboutSectionLayout from '../layouts/home/aboutSectionLayout';
import MotionSun from './sun';

const AboutDescriptionWrapLazy = dynamic(() => import('./descriptionWrap'), {
   loading: () => <div></div>,
});

const About = () => {
   const targetRef = useRef<HTMLDivElement | null>(null);
   const isMediumDisabled = useDisableBreakPoints();

   return (
      <AboutSectionLayout ref={targetRef}>
         <SectionHeader title='About Me' />
         <MotionPalmTrees isMediumDisabled={isMediumDisabled} />
         <MotionSun
            stateName={'START END END END'}
            offset={['start end', 'end end']}
            targetRef={targetRef}
            isMediumDisabled={isMediumDisabled}
         />
         <AboutDescriptionWrapLazy className='xl:mb-6' />
         <SkillWrap />
      </AboutSectionLayout>
   );
};

export default About;
