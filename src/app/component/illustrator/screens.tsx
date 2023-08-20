import { ClassNameProps } from '../../constants/@types';

function ProgrammingWindowSvg(props: ClassNameProps) {
   return (
      <svg
         xmlns='http://www.w3.org/2000/svg'
         viewBox='0 0 24 24'
         fill='none'
         stroke='currentColor'
         strokeWidth='0.5'
         strokeLinecap='round'
         strokeLinejoin='round'
         className={props.className}
      >
         {/* Frame */}
         <rect x='2' y='2' width='20' height='20'></rect>
         {/* Window panes */}
         <line x1='12' y1='2' x2='12' y2='22'></line>
         <line x1='2' y1='12' x2='22' y2='12'></line>
      </svg>
   );
}

export default ProgrammingWindowSvg;
