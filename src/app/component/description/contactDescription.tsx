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
            <p className='text-lg lg:text-xl mb-4 lg:mb-8 opacity-95 text-center'>
               {
                  "Have a project in mind? I’d love to hear about it! I'm open for freelance work and exploring new job opportunities."
               }
            </p>
            <RippleEffectButton
               name='Drop a Message'
               rippleSize={120}
               className='border-2 border-blue-200 w-42 h-14 lg:w-52 lg:h-16 hover:text-blue-800 hover:border-blue-800'
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
      <div className='pt-12 text-center py-6 lg:py-14'>
         <h2 className='font-serif font-bold text-3xl lg:text-5xl'>
            <span>{"Let's"}</span>
            <br />
            <span className='block'>{'Connect'}</span>
         </h2>
      </div>
   );
};

export { ContactDescription, ContactHeader };
