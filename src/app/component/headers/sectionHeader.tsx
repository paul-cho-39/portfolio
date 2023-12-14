interface HeaderProps {
   title: string;
}

export const SectionHeader = ({ title }: HeaderProps) => {
   return (
      <h2 className='relative flex items-start w-full highlighter-bg font-bold tracking-tight sm:text-3xl lg:text-5xl whitespace-nowrap mt-2 mb-4 lg:mb-8 '>
         {title}
      </h2>
   );
};
