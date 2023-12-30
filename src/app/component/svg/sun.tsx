import { ReactIconProps } from './reactIcon';

const Sun = ({ className, ...props }: ReactIconProps) => {
   return (
      <svg
         className='w-12 h-12 rounded-full'
         viewBox='0 0 50 50'
         xmlns='http://www.w3.org/2000/svg'
      >
         <circle cx='25' cy='25' r='15' fill='yellow' />
      </svg>
   );
};

export default Sun;
