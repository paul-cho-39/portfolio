import classNames from '../library/helper';
import clsx from 'clsx';
import { pacifico, montserratAlternatives } from './../fonts';

interface Description {
   description: string;
   className?: string;
}

export const FrontCoverTitle = (props: Description) => {
   return (
      <div className='-rotate-[26deg] text-xl md:text-2xl absolute left-0 px-4 top-1/4 transform -translate-y-1/2 z-20'>
         <h1 className={clsx(`${pacifico.className}`, props.className)}>{props.description}</h1>
      </div>
   );
};

export const FrontCoverDescription = (props: Description) => {
   return (
      <div className='text-2xl md:text-3xl lg:text-4xl absolute right-0 px-4 top-1/2 '>
         <p className={clsx(`${montserratAlternatives.className}`, props.className)}>
            {props.description}
         </p>
      </div>
   );
};
