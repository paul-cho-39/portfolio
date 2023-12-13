import { motion, AnimatePresence } from 'framer-motion';

import {
   ContactButton,
   ContactDescription,
   ContactHeader,
} from '../description/contactDescription';
import { Container } from '../layouts/container';
import RippleEffectButton from '../buttons/rippleEffectButton';

// determine:
// 1) whether to change the color to #faebd7
// 2) whether to add canvas here as well
const ContactPage = () => {
   return (
      <section id='contact'>
         <Container className='sky-fade-gradient min-h-[50vh] min-w-fit'>
            <ContactHeader />
            <ContactDescription />
            <RippleEffectButton name='Drop a Message' className=' text-white shadow-md' />
         </Container>
      </section>
   );
};

export default ContactPage;

// {/* TODO - highlight email */}
// <p className='text-center text-xl px-4 py-4 tracking-wide lg:leading-normal lg:px-36 lg:text-2xl'>
//    {
//       "Drop a line and say hello! If you're looking for someone to bring some fresh code to your team, or you've got a rad project idea and need a collaborator, hit me up! I'm totally open to new job opportunities and collaborations. Can't wait to hear from you! 🌴👩‍💻✌️"
//    }{' '}
// </p>
// {/* email button component create a separate one */}
// <div className='py-6'>
//    <button role='button' aria-label='email'>
//       <a href={'chosung2loud@gmail.com'}>paulcho@paul</a>
//    </button>
// </div>
