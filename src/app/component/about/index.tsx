import { useDisableBreakPoints } from '@/app/library/hooks/useDisableBreakPoints';
import { SectionHeader } from '../headers/sectionHeader';
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
         <main>
            <div className='flex flex-col-reverse lg:flex-row lg:items-stretch lg:justify-stretch'>
               {/* contents */}
               {/* <div className='w-full max-w-4xl px-2 mt-6 my-8 z-10 md:px-6 lg:pb-8 lg:pl-8 lg:pr-2 xl:pl-10'> */}
               {/* <p className='font-serif font-semibold text-xl py-4'>Important Words Here</p> */}
               {/* <p className='font-serif text-2xl tracking-wide indent-12 lg:leading-normal text-gray-600 xl:text-3xl'>
                     Quasi est quaerat. Sit molestiae et. Provident ad dolorem occaecati eos iste.
                     Soluta rerum quidem minus ut molestiae velit error quod. Excepturi quidem
                     expedita molestias quas.
                  </p>
               </div> */}
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
            <MotionPalmTrees isMediumDisabled={isMediumDisabled} />
         </main>
      </AboutSectionLayout>
   );
};

export default About;
