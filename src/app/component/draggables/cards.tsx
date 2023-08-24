interface DraggableCustomProps {
   axis: 'both' | 'x' | 'y';
   stretch: boolean;
}

const ProjectCards = () => {
   return (
      <section>
         {/* project title here */}
         <div className=''>
            <h1 className='text-center text-2xl'>Projects</h1>
         </div>
         <div className='relative z-10 mt-32 bg-slate-200 pb-20 sm:mt-56 sm:pb-24 lg:px-24'>
            <div className='absolute inset-0 overflow-hidden' aria-hidden='true'>
               <div className='absolute left-[calc(50%-19rem)] top-[calc(50%-36rem)] transform-gpu blur-3xl'>
                  <div
                     className='aspect-auto w-[68.5625rem] bg-gradient-to-r from-[#d1d0d0] to-[#9a99b7] opacity-25'
                     style={{
                        clipPath:
                           'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                     }}
                  />
               </div>
            </div>

            {/* images plus contents  */}
            <div className='mx-auto flex max-w-7xl flex-col items-center gap-x-16 gap-y-10 px-6 sm:gap-y-8 lg:px-10 lg:flex-row lg:items-stretch'>
               {/* images -- create a separate component */}
               <div className='-mt-8 w-full max-w-2xl lg:-mb-8 lg:w-96 lg:flex-none'>
                  <div className='relative aspect-[2/1] h-full md:-mx-8 lg:mx-0 lg:aspect-auto hover:drop-shadow-2xl'>
                     <img
                        className='hover:opacity-90 hover:-translate-y-2 transform transition-all duration-300 ease-in-out absolute inset-0 h-full w-full rounded-2xl object-cover shadow-2xl'
                        src='https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80'
                        alt=''
                     />
                  </div>

                  {/* <div className='relative aspect-[2/1] h-full md:-mx-8 lg:mx-0 lg:aspect-auto'>
                     <img
                        className='absolute inset-0 h-full w-full rounded-2xl bg-gray-800 object-cover shadow-2xl'
                        src='https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80'
                        alt=''
                     />
                  </div> */}
               </div>
               <div className='w-full max-w-2xl lg:px-14 xl:max-w-none xl:flex-auto xl:px-24 xl:py-24'>
                  <div>
                     <h3>Project Name</h3>
                  </div>
                  {/* tags - map it here */}
                  <div>
                     <span>tags</span>
                  </div>
                  {/* description */}
                  <figure className='relative isolate pt-6 sm:pt-12'>
                     <p>
                        Gravida quam mi erat tortor neque molestie. Auctor aliquet at porttitor a
                        enim nunc suscipit tincidunt nunc. Et non lorem tortor posuere. Nunc eu
                        scelerisque interdum eget tellus non nibh scelerisque bibendum.
                     </p>
                     <figcaption className='mt-8 text-base'>
                        <div className='font-semibold text-white'>Judith Black</div>
                        <div className='mt-1 text-gray-400'>CEO of Tuple</div>
                     </figcaption>
                  </figure>
               </div>
            </div>
         </div>
      </section>
   );
};

export default ProjectCards;
