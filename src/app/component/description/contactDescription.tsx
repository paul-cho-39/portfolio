import RippleEffectButton from '../buttons/rippleEffectButton';
import { SectionHeader } from '../headers/title';

interface ContactDescriptionProps {
   onClick?: () => void;
}

const ContactDescription = ({ onClick }: ContactDescriptionProps) => {
   const handleEmailClick = () => {
      const emailAddress = 'chosung2loud@gmail.com';
      window.location.href = `mailto:${emailAddress}`;
   };

   return (
      <div className='w-full mx-auto flex bg-red-500'>
         <div className='flex w-full flex-col items-center justify-center'>
            <p className='text-lg mb-4 opacity-95 text-center'>
               {"Interested in collaborating? I'm open to freelance and project opportunities!"}
            </p>
            <RippleEffectButton
               name='Drop a Message'
               className='sky-fade-gradient'
               onClick={handleEmailClick}
               rippleColor='dodgerblue'
            />
         </div>
      </div>
   );
};

const ContactHeader = () => {
   return (
      <div className='sky-fade-gradient'>
         <div className='pt-12 text-center my-2 lg:my-4'>
            <h2 className='font-serif sm:text-3xl font-bold lg:text-5xl'>
               <span>{"Let's"}</span>
               <br />
               <span className='block'>{'Connect'}</span>
            </h2>
         </div>
      </div>
   );
};

export { ContactDescription, ContactHeader };
