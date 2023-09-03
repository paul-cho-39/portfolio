export const SectionHeader = ({ title }: { title: string }) => {
   return (
      <h2 className='relative flex items-start w-full highlighter-bg font-bold tracking-tight sm:text-4xl whitespace-nowrap mt-2 mb-4 lg:mb-8 '>
         {title}
      </h2>
   );
};
