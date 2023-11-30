import { Container } from '../container';

const AboutSectionLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <section
         style={{
            backgroundImage: 'url("/white-brushed.png")',
            backgroundColor: '#faebd7',
         }}
         id='about'
      >
         <Container className='px-4 lg:mx-12 py-6 md:py-12 lg:py-14'>{children}</Container>
      </section>
   );
};

export default AboutSectionLayout;
