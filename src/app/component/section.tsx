import {
   useAnimation,
   useInView,
   useScroll,
   motion,
   useMotionValueEvent,
   useAnimate,
} from 'framer-motion';
import { useEffect, useRef } from 'react';

const Section = ({ children, id }: { children: React.ReactNode; id?: string }) => {
   // useAnimate for control?
   const [scope, animate] = useAnimate();
   const { scrollY, scrollYProgress } = useScroll();

   useMotionValueEvent(scrollY, 'change', (latest) => {
      console.log('Page scroll: ', latest);
//    });

   const ref = useRef<HTMLDivElement>(null);
   const isInView = useInView(ref);

   useEffect(() => {
      console.log('Element is in view: ', isInView);

      if (isInView) {
      }
   }, [isInView]);

   // as the scroll progresses, increase the opacity
   // how to find how scroll progresses?
   //

   return (
      <motion.section
         id={id}
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1 }}
         //  viewport={{ once: false, root: ref }}
         ref={ref}
      >
         {children}
      </motion.section>
   );
};

export default Section;
