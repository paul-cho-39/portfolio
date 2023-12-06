import { ReactIconProps } from './reactIcon';
import classNames from 'classnames';

interface WavyLineProps extends ReactIconProps {
   isHovered: boolean;
}

function WaveyLine({ isHovered, className, ...props }: WavyLineProps) {
   return (
      <svg
         width='100%'
         height='12'
         viewBox='0 0 100 12'
         xmlns='http://www.w3.org/2000/svg'
         {...props}
      >
         <path
            id='wavy'
            // stroke='#000'
            fill='transparent'
            d='M0 6 q 5 -10 10 0 t 10 0 t 10 0 t 10 0 t 10 0 t 10 0 t 10 0 t 10 0'
            className={classNames(
               isHovered
                  ? 'wavy-line -z-10 dark:text-gray-200 stroke-black dark:stroke-gray-200'
                  : 'hidden'
            )}
         />
      </svg>
   );
}

export default WaveyLine;
