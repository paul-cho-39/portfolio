import MetaDataDescription, { MetaDataDescriptionProps } from '../description/metaDataDescription';

type MainTitleContainerProps = MetaDataDescriptionProps & { title: string };

/**
 * This component is a container wrapper for MDX meta data file
 *
 */
export const MainTitleContainer = (props: MainTitleContainerProps) => {
   const { title, items } = props;
   return (
      <div className='flex flex-col lg:flex-row items-center w-full justify-around p-4 lg:px-8 lg:grid lg:grid-cols-6 shadow-lg border-[1px] dark:bg-slate-800 bg-slate-50'>
         <h1 className='text-center leading-relaxed lg:text-left font-semibold text-3xl lg:text-4xl lg:col-span-4 dark:text-gray-200 mb-4 lg:mb-0'>
            {title}
         </h1>
         <div className='lg:col-span-2 w-full'>
            <MetaDataDescription items={items} />
         </div>
      </div>
   );
};
