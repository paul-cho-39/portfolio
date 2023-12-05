type MetaDataItem = {
   icon: React.ElementType; // Type for a React component
   title: string;
   value: string | number;
   //    value: (value: string | number) => string | number;
};

export type MetaDataDescriptionProps = {
   items: MetaDataItem[];
};

// TODO: Link the tags?
const MetaDataDescription = ({ items }: MetaDataDescriptionProps) => {
   return (
      <div className='flex flex-col justify-around items-start w-full lg:ml-4 p-2'>
         {items.map((item, index) => (
            <div
               key={index}
               className='flex flex-row items-center justify-center lg:space-x-2 my-1.5'
            >
               <item.icon className='w-6 h-6 lg:w-8 lg:h-8' />
               <span className='sr-only'>{item.title}</span>
               <span className='text-sm md:text-md ml-6 px-1 dark:text-slate-200'>{`${item.value}`}</span>
            </div>
         ))}
      </div>
   );
};

export default MetaDataDescription;
