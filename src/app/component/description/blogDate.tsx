import { BlogContainerProps, IconStyle } from '@/app/library/@types';
import { formatDate } from '@/app/library/helpers/formatDate';

type BlogDateProps = Pick<BlogContainerProps, 'date'>;

const BlogDate = (props: BlogDateProps) => {
   return (
      <div className='dark:text-slate-100 text-slate-900'>
         <span>Written on: {formatDate(props.date)}</span>
      </div>
   );
};

export default BlogDate;
