import { forwardRef } from 'react';
import { Container, ContainerOuter } from '../container';

const ContactSectionLayout = forwardRef<
   React.ElementRef<typeof ContainerOuter>,
   React.ComponentPropsWithoutRef<typeof ContainerOuter>
>(function ContactSectionLayout({ children, ...props }, ref) {
   return (
      <section id='contact'>
         <Container
            ref={ref}
            className='sky-fade-gradient min-h-full min-w-fit px-4 lg:px-6 text-black dark:text-black'
         >
            {children}
         </Container>
      </section>
   );
});

export default ContactSectionLayout;
