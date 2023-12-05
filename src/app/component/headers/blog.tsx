import MetaDataDescription, { MetaDataDescriptionProps } from '../description/metaDataDescription';

type MainTitleContainerProps = MetaDataDescriptionProps & { title: string };
// export const MainTitleContainer = (props: MainTitleContainerProps) => {
//    const { title, items } = props;
//    return (
//       // <div className='dark:text-slate-100'>
//       <div className='flex flex-col lg:flex-row justify-around items-center w-full p-4 dark:bg-slate-800 bg-slate-100'>
//          {/* <h1 className='text-center lg:text-left font-semibold text-3xl lg:text-4xl dark:text-gray-200'> */}
//          <h1 className='text-center lg:text-left font-semibold text-3xl lg:text-4xl dark:text-gray-200 mb-4 lg:mb-0'>
//             {title}
//          </h1>
//          <MetaDataDescription items={items} />
//       </div>
//    );
// };

export const MainTitleContainer = (props: MainTitleContainerProps) => {
   const { title, items } = props;
   return (
      <div className='flex flex-col lg:flex-row items-center w-full justify-around p-4 lg:px-8 lg:grid lg:grid-cols-5 shadow-lg border-[1px] dark:bg-slate-800 bg-slate-50'>
         <h1 className='text-center leading-relaxed lg:text-left font-semibold text-3xl lg:text-4xl lg:col-span-3 dark:text-gray-200 mb-4 lg:mb-0'>
            {title}
         </h1>
         <div className='lg:col-span-2 w-full'>
            <MetaDataDescription items={items} />
         </div>
      </div>
   );
};
