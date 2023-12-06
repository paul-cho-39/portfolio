import { useDisableBreakPoints } from '@/app/library/hooks/useDisableBreakPoints';
import { SectionHeader } from '../headers/title';
import { Container, ContainerInner } from '../layouts/container';

import { Skills } from './skills';
import MotionPalmTrees from './palmTrees';
import AboutSectionLayout from '../layouts/home/aboutSectionLayout';
import AboutMeDescription from '../description/aboutDescription';

const About = () => {
   const isMediumDisabled = useDisableBreakPoints();
   return (
      <AboutSectionLayout>
         <SectionHeader title='About Me' />
         <MotionPalmTrees isMediumDisabled={isMediumDisabled} />
         <div className='flex flex-col-reverse lg:flex-row lg:items-stretch lg:justify-stretch'>
            {/* contents */}
            <AboutMeDescription />

            {/* images */}
            <div className='mb-12 inline-flex justify-center self-center items-center lg:inline-flex lg:justify-center bg-red-500'>
               {/* TODO: use image here */}
               <img
                  src='https://images.unsplash.com/photo-1670272502246-768d249768ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1152&q=80'
                  alt=''
                  // TODO: depending on the pic play with aspec ratio and width
                  className='aspect-[2:7] w-[24rem] rounded-2xl bg-gray-50 object-cover lg:aspect-[auto] lg:max-w-none lg:px-8'
               />
            </div>
         </div>
         <Skills />
      </AboutSectionLayout>
   );
};

export default About;
