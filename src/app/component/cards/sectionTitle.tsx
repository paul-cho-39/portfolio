export const Title = ({ title }: { title: string }) => {
   return (
      <div className='relative w-full my-4 py-8 sm:top-2 sm:-mb-12 lg:mb-4 lg:top-12 lg:py-0'>
         <h2 className='text-left text-2xl px-6 sm:text-3xl lg:px-12 dark:text-slate-100 highlighter-bg'>
            {title}
         </h2>
      </div>
   );
};
