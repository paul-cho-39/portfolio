import { ContactDescription, ContactHeader } from '../description/contactDescription';
import Footer from '../footer';
import ContactSectionLayout from '../layouts/home/contactSectionLayout';

const Contact = () => {
   return (
      <ContactSectionLayout>
         <div className='w-full px-6 lg:px-10 py-0 mb-4 flex flex-col items-center justify-center'>
            <ContactHeader />
            <ContactDescription />
         </div>
         <Footer
            withWaveBg={true}
            className='relative md:py-8 lg:py-12 xl:py-20 bg-transparent h-full text-black dark:text-black'
         />
      </ContactSectionLayout>
   );
};

export default Contact;
