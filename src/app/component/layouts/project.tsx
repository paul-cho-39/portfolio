import { Container } from './container';

export const ProjectLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <Container
         style={{
            backgroundImage: 'url("/white-brushed.png")',
            backgroundColor: '#faebd7',
         }}
         className='py-6'
      >
         <div className='z-10 sm:mt-28 sm:pb-24 md:px-12 lg:mt-44'>{children}</div>
      </Container>
   );
};
