import { motion, AnimatePresence } from 'framer-motion';
import { Container } from './layouts/container';
import { Divider } from './divider';
import Link from 'next/link';

const ContactPage = () => {
   return (
      <Container>
         <div className='w-full h-full bg-yellow-300'>
            <div className='flex flex-col items-center justify-center'>
               {/* TODO - highlight email */}
               <h3 className='font-sans text-4xl'>{"Let's have a chat!"}</h3>
               <div>Email</div>

               <Divider />
               <ul role='list' className='flex flex-row gap-x-4'>
                  <Link href='/'>
                     <li>Instagram</li>
                  </Link>
                  <Link href='/'>
                     <li>LinkedIn</li>
                  </Link>
                  <Link href='/'>
                     <li>Github</li>
                  </Link>
               </ul>
            </div>
         </div>
      </Container>
   );
};

export default ContactPage;
