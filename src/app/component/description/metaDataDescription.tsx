type MetaDataItem = {
   icon: React.ElementType; // Type for a React component
   title: string;
   value: string | number;
};

export type MetaDataDescriptionProps = {
   items: MetaDataItem[];
};

// TODO: Link the tags?
/**
 *
 * This component is used to display meta description from MDX files
 */
const MetaDataDescription = ({ items }: MetaDataDescriptionProps) => {
   return (
      <div className='flex flex-col justify-around items-start w-full lg:ml-4 p-2'>
         {items.map((item, index) => (
            <div
               key={index}
               className='flex flex-row items-center justify-center lg:space-x-2 my-1.5'
            >
               <item.icon className='w-6 h-6 lg:w-8 lg:h-8 dark:text-gray-300' />
               <span className='sr-only'>{item.title}</span>
               <span className='text-base font-medium ml-6 px-1 dark:text-gray-300'>{`${item.value}`}</span>
            </div>
         ))}
      </div>
   );
};

export default MetaDataDescription;
