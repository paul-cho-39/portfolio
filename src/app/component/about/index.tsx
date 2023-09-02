import { SectionHeader } from '../headers/sectionHeader';
import { Container, ContainerInner } from '../layouts/container';
import { Description } from './decription';
import { Skills } from './skills';

// TODO: increase the font size and add in description
const About = () => {
   return (
      // <Section id='about_me'>
      <section
         style={{
            backgroundImage: 'url("/white-brushed.png")',
            backgroundColor: '#faebd7',
         }}
         id='about_me'
      >
         <Container className='px-4 lg:mx-12 py-8 md:py-12 lg:py-14'>
            <SectionHeader title='About Me' />
            <div className='flex flex-col-reverse lg:flex-row lg:items-stretch lg:justify-stretch'>
               {/* contents */}
               <div className='w-full max-w-4xl px-2 mt-6 my-8 lg:pb-8 md:px-6'>
                  {/* <p className='font-serif font-semibold text-xl py-4'>Important Words Here</p> */}
                  <p className='font-medium font-serif text-xl lg:text-3xl tracking-wide indent-12 lg:leading-normal text-gray-600'>
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
         </Container>
      </section>
   );
};
{
   /* </section> */
}

export default About;

// lg:aspect[2:5] lg:w-[18rem]
