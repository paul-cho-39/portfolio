import { ContactDescription, ContactHeader } from '../description/contactDescription';
import ContactSectionLayout from '../layouts/home/contactSectionLayout';

const Contact = () => {
   return (
      <ContactSectionLayout>
         <ContactHeader />
         <ContactDescription />
      </ContactSectionLayout>
   );
};

export default Contact;
