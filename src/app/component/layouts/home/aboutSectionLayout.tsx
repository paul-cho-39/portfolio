import { forwardRef } from 'react';
import { Container, ContainerOuter } from '../container';

const AboutSectionLayout = forwardRef<
   React.ElementRef<typeof ContainerOuter>,
   React.ComponentPropsWithoutRef<typeof ContainerOuter>
>(function AboutSectionLayout({ children, ...props }, ref) {
   return (
      <section
         style={{
            backgroundImage: 'url("/white-brushed.png")',
            backgroundColor: '#faebd7',
         }}
         id='about'
      >
         <Container
            ref={ref}
            {...props}
            className='px-4 lg:mx-6 py-6 md:py-12 lg:py-14 lg:overflow-hidden'
         >
            {children}
         </Container>
      </section>
   );
});

export default AboutSectionLayout;
