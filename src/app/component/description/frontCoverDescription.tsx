import clsx from 'clsx';
import { pacifico, montserratAlternatives } from '../../fonts';

interface Main {
   main: React.ReactElement;
   className?: string;
}

interface Description extends Main {
   description: string;
   intro: string;
}

// maybe use this for section header in general?
export const FrontCoverTitle = (props: Main) => {
   return <h1 className={clsx(`${pacifico.className}`, props.className)}>{props.main}</h1>;
};

// which color goes well with this(?)
const FrontCoverPre = ({ intro }: { intro: string }) => {
   return <p className='text-lg font-serif pl-4 my-3 lg:mb-5'>{intro}</p>;
};

export const FrontCoverDescription = (props: Description) => {
   return (
      <main>
         <div className='absolute top-[23%] left-0 px-6 lg:px-16 lg:top-[10%] selection:bg-blue-800'>
            <div className='relative md:flex md:flex-col md:w-full md:h-full'>
               <div className='relative md:col-span-1 md:h-full md:w-full top-0 mb-6 lg:mb-8'>
                  <FrontCoverPre intro={props.intro} />
                  <FrontCoverTitle
                     className=' text-5xl md:text-6xl lg:text-8xl'
                     main={props.main}
                  />
               </div>
               <div className='py-4 sm:pl-6 sm:pr-14 md:indent-36 md:py-8 md:pl-10 md:pr-48 md:tracking-wide lg:py-8 lg:indent-64 lg:pr-[43%] xl:pr-[50%]'>
                  <p
                     className={clsx(
                        'text-xl font-serif indent-24 tracking-wide text-gray-800 lg:leading-relaxed xl:text-3xl'
                     )}
                  >
                     {props.description}
                  </p>
               </div>
            </div>
         </div>
      </main>
   );
};
