interface HeaderProps {
   title: string;
}

export const SectionHeader = ({ title }: HeaderProps) => {
   return (
      <h2 className='relative flex items-start w-full highlighter-bg font-bold tracking-tight sm:text-4xl whitespace-nowrap mt-2 mb-4 lg:mb-8 '>
         {title}
      </h2>
   );
};

export const Title = ({ title }: HeaderProps) => {
   return <h2 className='text-6xl font-mono font-semibold mb-4 dark:text-gray-200'>{title}</h2>;
};
