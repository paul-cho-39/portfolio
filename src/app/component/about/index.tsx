import { useDisableBreakPoints } from '@/app/library/hooks/useDisableBreakPoints';
import { SectionHeader } from '../headers/sectionHeader';
import { Container, ContainerInner } from '../layouts/container';

import { Skills } from './skills';
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
         <Skills />
      </AboutSectionLayout>
   );
};

// const About = () => {
//    const targetRef = useRef<HTMLDivElement | null>(null);
//    const isMediumDisabled = useDisableBreakPoints();

//    return (
//       <AboutSectionLayout ref={targetRef}>
//          <SectionHeader title='About Me' />
//          <MotionPalmTrees isMediumDisabled={isMediumDisabled} />
//          {/* <SunSvg /> */}
//          <MotionSun targetRef={targetRef} isMediumDisabled={isMediumDisabled} />

//          {/* possibility the ref may be changed? */}
//          <div className='flex flex-col-reverse lg:flex-row lg:items-stretch lg:justify-stretch'>
//             {/* contents */}
//             <div className='px-2 mt-6 my-8 z-10 md:px-6 lg:pb-8 lg:px-10'>
//                <AboutMeDescription />
//             </div>

//             {/* AboutMeImage */}
//             <div className='w-[60%] md:w-[40%] lg:w-full py-4 lg:px-6 lg:pb-6 lg:pt-1 flex-grow justify-center self-center items-center lg:inline-flex lg:justify-center'>
//                <ProfileImage />
//             </div>
//          </div>
//          <Skills />
//       </AboutSectionLayout>
//    );
// };

export default About;
