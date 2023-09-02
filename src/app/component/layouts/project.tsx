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
         <div className='z-10 mt-8 px-2 sm:pb-16 md:px-12 lg:mt-28'>{children}</div>
      </Container>
   );
};
