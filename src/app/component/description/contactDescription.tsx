import { SectionHeader } from '../headers/title';

const ContactDescription = () => {
   return (
      <p className='text-lg mb-4 opacity-95 text-center'>
         {"Interested in collaborating? I'm open to freelance and project opportunities!"}
      </p>
   );
};

const ContactButton = () => {
   return (
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center'>
         Drop a Message
      </button>
   );
};

const ContactHeader = () => {
   return (
      <div className='px-4 lg:px-6'>
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

export { ContactDescription, ContactHeader, ContactButton };
