import { BlogContainerProps, IconStyle } from '@/app/constants/@types';
import { ClockIcon } from '@heroicons/react/24/outline';

type TotalReadingTimeProps = Pick<BlogContainerProps, 'totalReadingTime'> & IconStyle;

const TotalReadingTime = (props: TotalReadingTimeProps) => {
   return (
      <h3>
         <ClockIcon className={props.iconStyle} aria-hidden={true} />
         <span className='sr-only'>Total Reading Time</span>
         {props.totalReadingTime} <span>mins</span>
      </h3>
   );
};

export default TotalReadingTime;
