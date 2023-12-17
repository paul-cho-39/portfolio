import RippleEffectButton from '../buttons/rippleEffectButton';
import { SectionHeader } from '../headers/sectionHeader';

const ContactDescription = ({}) => {
   const handleEmailClick = () => {
      const emailAddress = 'chosung2loud@gmail.com';
      window.location.href = `mailto:${emailAddress}`;
   };

   return (
      <div className='w-full mx-auto flex'>
         <div className='font-sans flex w-full flex-col items-center justify-center py-4 lg:py-8'>
            <p className='text-lg mb-4 opacity-95 text-center'>
               {"Interested in collaborating? I'm open to freelance and project opportunities!"}
            </p>
            <RippleEffectButton
               name='Drop a Message'
               rippleSize={70}
               className='sky-fade-gradient border-2 border-transparent hover:text-blue-800 hover:border-blue-800'
               createRippleOnClick={true}
               onClick={handleEmailClick}
               rippleColor='dodgerblue'
            />
         </div>
      </div>
   );
};

const ContactHeader = () => {
   return (
      <div className='pt-12 text-center py-6 lg:py-10'>
         <h2 className='font-serif font-bold text-3xl lg:text-5xl'>
            <span>{"Let's"}</span>
            <br />
            <span className='block'>{'Connect'}</span>
         </h2>
      </div>
   );
};

export { ContactDescription, ContactHeader };
