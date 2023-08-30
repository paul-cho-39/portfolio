import { motion, AnimatePresence } from 'framer-motion';
import { Container } from './layouts/container';
import { Divider } from './divider';

const ContactPage = () => {
   return (
      <Container>
         <div className='w-full h-full bg-yellow-300'>
            <div className='flex items-center justify-center'>
               {/* TODO - highlight */}
               <h3 className='font-sans text-4xl'>{"Let's have a chat!"}</h3>
               {/* <Divider />                */}
            </div>
         </div>
      </Container>
   );
};

export default ContactPage;
