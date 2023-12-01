import { BlogContainerProps, IconStyle } from '@/app/library/@types';
import TotalReadingTime from '../description/totalReadingTime';
import BlogDate from '../description/blogDate';
import Keywords from '../description/keywords';

/**
 * Title page
 * All data below should be represented in .json file.
 * For assigning keywords and connecting them from one idea to another it may be useful to think of fibonacci concept where the screen gets smaller for each idea(?)
 */

type MainTitleContainerProps = BlogContainerProps & IconStyle;
export const MainTitleContainer = (props: MainTitleContainerProps) => {
   const { title, ...rest } = props;
   return (
      <div className='dark:text-slate-100'>
         <h2 className='text-center p-1 text-6xl dark:text-gray-200'>{title}</h2>
         <MetaContainer {...rest} />
      </div>
   );
};

// having to write this as 'aside' and then fold it for each
// of the keyword 'maximum' nest should be 4
type MetaContainerProps = Omit<BlogContainerProps, 'title'> & IconStyle;
const MetaContainer = (props: MetaContainerProps) => {
   const { date, keywords, totalReadingTime, iconStyle } = props;
   return (
      <div className='flex flex-col w-full bg-red-500'>
         <div className='grid grid-cols-3 text-lg dark:text-slate-100 bg-yellow-500'>
            <TotalReadingTime totalReadingTime={totalReadingTime} iconStyle={iconStyle} />
            <BlogDate date={date} />
            <Keywords iconStyle={iconStyle} keywords={keywords} />
         </div>
      </div>
   );
};
