import { motion, AnimatePresence } from 'framer-motion';

const ContactPage = () => {
   const text = `This is a multi-line
paragraph that will be revealed
line by line.`;

   const lines = text.split('\n');

   const lineVariants = {
      hidden: { opacity: 0, x: '-1.5%' },
      visible: { opacity: 1, x: '0%' },
   };
   return (
      <div className='w-full h-24 py-36 bg-yellow-300'>
         <AnimatePresence>
            {lines.map((line, index) => (
               <motion.div
                  className='text-2xl text-center'
                  key={index}
                  variants={lineVariants}
                  initial='hidden'
                  animate='visible'
                  exit='hidden'
                  transition={{ duration: 0.1, delay: index * 0.2 }}
               >
                  {line}
               </motion.div>
            ))}
         </AnimatePresence>
      </div>
   );
};

export default ContactPage;
