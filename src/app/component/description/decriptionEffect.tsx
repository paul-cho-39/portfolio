import { motion, AnimatePresence } from 'framer-motion';

export const Description = ({ text }: { text: string }) => {
   const lines = text.split('\n');

   const lineVariants = {
      hidden: { opacity: 0, x: '-1.5%' },
      visible: { opacity: 1, x: '0%' },
   };
   return (
      <>
         <AnimatePresence>
            {lines.map((line, index) => (
               <motion.p
                  className='text-2xl text-center'
                  key={index}
                  variants={lineVariants}
                  initial='hidden'
                  animate='visible'
                  exit='hidden'
                  transition={{ duration: 0.1, delay: index * 0.2 }}
               >
                  {line}
               </motion.p>
            ))}
         </AnimatePresence>
      </>
   );
};
