import { SectionHeader } from '../headers/sectionHeader';
import { Container, ContainerInner } from '../layouts/container';

const About = () => {
   return (
      <section id='about_me'>
         <Container className='py-16 md:py-20 lg:py-24'>
            <SectionHeader title='About Me' />
            <div className='flex flex-col-reverse lg:flex-row lg:items-stretch lg:justify-stretch bg-yellow-200'>
               {/* contents */}
               <div className='w-full my-8 lg:pb-8 h-auto'>
                  <p className='font-semibold text-xl py-4'>Important Words Here</p>
                  <p className='px-2 mt-6 text-lg tracking-wide leading-6 md:leading-8 lg:tracking-wider lg:text-xl text-gray-600'>
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
         </Container>
      </section>
   );
};

export default About;
