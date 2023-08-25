export const Title = ({ title }: { title: string }) => {
   return (
      <div className='relative w-full mt-6 py-8 mb-0 sm:top-2 sm:mb-2 md:mb-0 lg:top-12 lg:py-0'>
         <h1 className='text-left text-xl px-8 md:text-3xl lg:px-12 dark:text-slate-100'>
            {title}
         </h1>
      </div>
   );
};
