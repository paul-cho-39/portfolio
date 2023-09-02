import { motion, AnimatePresence } from 'framer-motion';
import { Container } from './layouts/container';
import { Divider } from './divider';
import Link from 'next/link';
import { SectionHeader } from './headers/sectionHeader';
import { FrontCoverTitle } from './frontCover';

const ContactPage = () => {
   return (
      <section
         id='contact'
         className='sky-fade-gradient min-h-screen min-w-fit'
         // style={{
         //    backgroundImage: 'url("/white-brushed.png")',
         //    backgroundColor: '#faebd7',
         // }}
      >
         <Container className='py-8 px-4 lg:mx-12 lg:px-8'>
            <div className='w-full h-full flex flex-col items-center justify-center'>
               <h3 className='font-sans pt-4 pb-12 text-5xl md:text-6xl lg:text-7xl'>
                  <span className='block py-1'>{"Let's"}</span>
                  <span className='block py-1'>{'Connect'}</span>
               </h3>
               {/* <FrontCoverTitle
                  className=' text-5xl md:text-6xl lg:text-7xl py-12'
                  main={
                     <>
                        <span className='block py-1'>{"Let's"}</span>
                        <span className='block py-1'>{'Connect'}</span>
                     </>
                  }
               /> */}
               <div className='flex flex-col items-center justify-center'>
                  {/* TODO - highlight email */}
                  <p className='text-xl px-2 py-4 tracking-wide lg:leading-normal lg:px-36 lg:text-2xl'>
                     {
                        "Drop a line and say hello! If you're looking for someone to bring some fresh code to your team, or you've got a rad project idea and need a collaborator, hit me up! I'm totally open to new job opportunities and collaborations. Can't wait to hear from you! 🌴👩‍💻✌️"
                     }{' '}
                  </p>
                  {/* email button component create a separate one */}
                  <div className='py-6'>
                     <button role='button' aria-label='email'>
                        <a href={'chosung2loud@gmail.com'}>paulcho@paul</a>
                     </button>
                  </div>

                  <Divider position='absolute' top='top-[94%]' className='bg-gray-800' />
                  <ul role='list' className='flex flex-row gap-x-12'>
                     <Link role='link' aria-label='Instagram' href='/'>
                        <li>Instagram</li>
                     </Link>
                     <Link role='link' aria-label='LinkedIn' href='/'>
                        <li>LinkedIn</li>
                     </Link>
                     <Link role='link' aria-label='Github' href='/'>
                        <li>Github</li>
                     </Link>
                  </ul>
               </div>
            </div>
         </Container>
      </section>
   );
};

export default ContactPage;
