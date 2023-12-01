import { BlogContainerProps, IconStyle } from '@/app/library/@types';
import { TagIcon } from '@heroicons/react/24/outline';

type KeywordProps = Pick<BlogContainerProps, 'keywords'> & IconStyle;

// show more and it should be expandable?
const Keywords = (props: KeywordProps) => {
   return (
      <div className='flex flex-row gap-x-1'>
         <TagIcon className={props.iconStyle} aria-hidden='true' />
         <span className='sr-only'>keywords</span>
         {props.keywords.map((tag, index) => (
            <h3 key={index}>{tag}</h3>
         ))}
      </div>
   );
};

export default Keywords;
