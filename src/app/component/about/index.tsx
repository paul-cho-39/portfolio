import { useDisableBreakPoints } from '@/app/library/hooks/useDisableBreakPoints';
import { SectionHeader } from '../headers/sectionHeader';
import { Container, ContainerInner } from '../layouts/container';
import { PalmTrees } from '../svg/palm-trees';
import { Description } from './decription';
import { Skills } from './skills';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import MotionPalmTrees from './palmTrees';

const About = () => {
   const scrollRef = useRef<HTMLDivElement>(null);

   const isInView = useInView(scrollRef, {
      margin: '20px',
   });

   console.log('is it in view?: ', isInView);

   const isMediumDisabled = useDisableBreakPoints();

   return (
      <section
         style={{
            backgroundImage: 'url("/white-brushed.png")',
            backgroundColor: '#faebd7',
         }}
         id='about'
      >
         <Container ref={scrollRef} className='px-4 lg:mx-12 py-6 md:py-12 lg:py-14'>
            <SectionHeader title='About Me' />
            <div className='flex flex-col-reverse lg:flex-row lg:items-stretch lg:justify-stretch'>
               {/* contents */}
               <div className='w-full max-w-4xl px-2 mt-6 my-8 z-10 md:px-6 lg:pb-8 lg:pl-8 lg:pr-2 xl:pl-10'>
                  {/* <p className='font-serif font-semibold text-xl py-4'>Important Words Here</p> */}
                  <p className='font-serif text-2xl tracking-wide indent-12 lg:leading-normal text-gray-600 xl:text-3xl'>
                     Quasi est quaerat. Sit molestiae et. Provident ad dolorem occaecati eos iste.
                     Soluta rerum quidem minus ut molestiae velit error quod. Excepturi quidem
                     expedita molestias quas.
                  </p>
               </div>

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
            <MotionPalmTrees isMediumDisabled={isMediumDisabled} isInView={isInView} />
         </Container>
      </section>
   );
};
{
   /* </section> */
}

export default About;

// lg:aspect[2:5] lg:w-[18rem]
