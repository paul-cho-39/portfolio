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
            stroke='#000'
            fill='transparent'
            d='M0 6 q 5 -10 10 0 t 10 0 t 10 0 t 10 0 t 10 0 t 10 0 t 10 0 t 10 0'
            className={classNames(isHovered ? 'wavy-line z-0' : 'hidden')}
            // className='hover:stroke-orange-500 hover:wavy-line'
            // strokeDasharray={1000}
            // strokeDashoffset={1000}
         />
      </svg>
   );
}

export default WaveyLine;
