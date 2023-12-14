import clsx from 'clsx';
import { pacifico, montserratAlternatives } from '../../fonts';
import Contacts from '../fab/contact';

interface Main {
   main: React.ReactElement;
   className?: string;
}

interface Description extends Main {
   description: string;
   intro: string;
}

// maybe use this for section header in general?
const Title = (props: Main) => {
   return <h1 className={clsx(`${pacifico.className}`, props.className)}>{props.main}</h1>;
};

// which color goes well with this(?)
const Intro = ({ intro }: { intro: string }) => {
   return <p className='text-lg font-serif pl-4 my-3 lg:mb-5'>{intro}</p>;
};

const Description = ({ description }: { description: string }) => {
   return (
      <div className='py-2 sm:pl-6 sm:pr-14 md:py-8 md:pl-10 md:pr-48 md:tracking-wide lg:py-8 lg:pr-[35%] xl:pr-[40%]'>
         <p
            className={clsx(
               'text-xl font-sans tracking-wide text-gray-800 lg:leading-relaxed xl:text-3xl'
            )}
         >
            {description}
         </p>
      </div>
   );
};

export const FrontCoverDescription = (props: Description) => {
   return (
      <main>
         <div className='absolute top-[23%] left-0 px-6 lg:px-16 lg:top-[10%]'>
            <div className='relative md:flex md:flex-col md:w-full md:h-full'>
               <div className='relative md:col-span-1 md:h-full md:w-full top-0 mb-4 lg:mb-8'>
                  <Intro intro={props.intro} />
                  <Title className=' text-5xl md:text-6xl lg:text-8xl' main={props.main} />
                  <div className='mt-6 lg:mt-10 items-center justify-start inline-flex'>
                     <Contacts displayEmail={true} stroke='black' strokeWidth={0.8} />
                  </div>
               </div>
               <Description description={props.description} />
            </div>
         </div>
      </main>
   );
};
