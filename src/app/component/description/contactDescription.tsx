import RippleEffectButton from '../buttons/rippleEffectButton';
import { SectionHeader } from '../headers/title';

interface ContactDescriptionProps {
   onClick?: () => void;
}

const ContactDescription = ({ onClick }: ContactDescriptionProps) => {
   const handleEmailClick = () => {
      const emailAddress = 'chosung2loud@gmail.com';
      window.location.href = `mailto:${emailAddress}`;

      // console.log('PRESSED HERE');
   };

   return (
      <div className='w-full mx-auto flex'>
         <div className='flex w-full flex-col items-center justify-center my-2'>
            <p className='text-lg mb-4 opacity-95 text-center'>
               {"Interested in collaborating? I'm open to freelance and project opportunities!"}
            </p>
            <RippleEffectButton
               name='Drop a Message'
               rippleSize={70}
               className='sky-fade-gradient border-blue-400 border-spacing-1 border-2 my-2 lg:my-4 hover:text-blue-700'
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
         <h2 className='font-serif sm:text-3xl font-bold lg:text-5xl'>
            <span>{"Let's"}</span>
            <br />
            <span className='block'>{'Connect'}</span>
         </h2>
      </div>
   );
};

export { ContactDescription, ContactHeader };
