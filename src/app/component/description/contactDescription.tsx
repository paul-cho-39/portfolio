import { SectionHeader } from '../headers/title';

const ContactDescription = () => {
   return <div></div>;
};

// const ContactHeader = () => {
//    return (
//       <div className='h-full px-4 lg:px-6 '>
//          <div className='relative bg-red-500'>
//             <div className='absolute top-12 bg-blue-500'>
//                <h2 className='font-serif text-8xl lg:text-9xl text-left'>
//                   <span>{"Let's"}</span>
//                   <br />
//                   <span className='mt-3 block'>{'Connect'}</span>
//                </h2>
//             </div>
//          </div>
//       </div>
//    );
// };

const ContactHeader = () => {
   return (
      <div className='px-4 lg:px-6'>
         <div className='pt-12 text-center'>
            <h2 className='font-serif sm:text-3xl font-bold lg:text-5xl'>
               <span>{"Let's"}</span>
               <br />
               <span className='block'>{'Connect'}</span>
            </h2>
            <p className='opacity-90 text-lg mb-4'>
               {"Interested in collaborating? I'm open to freelance and project opportunities!"}
            </p>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
               Drop a Message
            </button>
         </div>
      </div>
   );
};

export { ContactDescription, ContactHeader };
