import { Container, ContainerOuter } from '../container';

const ContactSectionLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <section id='contact'>
         <div className='sky-fade-gradient min-h-full min-w-fit w-full text-black dark:text-black'>
            {children}
         </div>
      </section>
   );
};

export default ContactSectionLayout;
