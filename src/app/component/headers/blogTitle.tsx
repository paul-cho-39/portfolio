import MetaDataDescription, { MetaDataDescriptionProps } from '../description/metaDataDescription';
import { Divider } from '../layouts/divider';

type MainTitleContainerProps = MetaDataDescriptionProps & { title: string };

/**
 * This component is a container wrapper for MDX meta data file
 *
 */
export const MainTitleContainer = (props: MainTitleContainerProps) => {
   const { title, items } = props;
   return (
      <>
         <div className='flex flex-col lg:flex-row items-center w-full justify-around p-4 lg:px-8 lg:grid lg:grid-cols-6'>
            <h1 className='text-center leading-relaxed lg:text-left font-semibold text-3xl lg:text-4xl lg:col-span-4 dark:text-gray-200 mb-4 lg:mb-0'>
               {title}
            </h1>
            <div className='lg:col-span-2 w-full'>
               <MetaDataDescription items={items} />
            </div>
         </div>
         <Divider
            position='relative'
            top='top-0'
            className='w-full h-1 dark:bg-blue-300 bg-blue-800/80'
         />
      </>
   );
};
