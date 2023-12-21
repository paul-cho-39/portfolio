import { useDisableBreakPoints } from '@/app/library/hooks/useDisableBreakPoints';
import { SectionHeader } from '../headers/sectionHeader';
import { Container, ContainerInner } from '../layouts/container';

import SkillWrap from './skills';
import MotionPalmTrees from './palmTrees';
import AboutSectionLayout from '../layouts/home/aboutSectionLayout';
import AboutMeDescription from '../description/aboutDescription';
import { useRef } from 'react';
import MotionSun from './sun';
import ProfileImage from './profileImage';
import AboutDescriptionWrap from './descriptionWrap';

const About = () => {
   const targetRef = useRef<HTMLDivElement | null>(null);
   const isMediumDisabled = useDisableBreakPoints();

   return (
      <AboutSectionLayout ref={targetRef}>
         <SectionHeader title='About Me' />
         <MotionPalmTrees isMediumDisabled={isMediumDisabled} />
         <MotionSun targetRef={targetRef} isMediumDisabled={isMediumDisabled} />
         <AboutDescriptionWrap />
         <SkillWrap />
      </AboutSectionLayout>
   );
};

export default About;
