export const ProjectLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <div className='mx-auto px-4 my-8 lg:my-0 lg:mb-0 lg:px-20'>
         <div className='relative z-10 bg-slate-200 sm:mt-28 sm:pb-24 md:px-12 lg:mt-44'>
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
            {children}
         </div>
      </div>
   );
};
