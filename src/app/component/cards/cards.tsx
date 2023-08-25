import classNames from '@/app/library/helper';
import { GithubIcon } from '../fab/contacts';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useDisableBreakPoints } from '@/app/library/hooks/useDisableBreakPoints';

import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { SourceCode } from './contents';

export interface ProjectsProps {
   title: string;
   image: string;
   description: string;
   url: string | undefined;
   github: string;
   badge: string[];
}

interface ProjectCardsProps {
   projects: ProjectsProps[];
   badgeColor?: '';
}

const Cards = ({ projects }: ProjectCardsProps) => {
   const el = useRef<HTMLDivElement>(null);
   const isOdd = (idx: number) => idx % 2 !== 0;

   const repositionByIndex = (idx: number) => {
      const maxStep = projects.length; // maximum step boundary
      const stepSize = 5; // step size in pixels
      let step;

      if (idx <= maxStep) {
         step = idx * stepSize;
      } else {
         step = (maxStep - (idx - maxStep)) * stepSize;
      }
      //   return `pl-${step}`;
      return step + 'rem';
   };

   const isDisabled = useDisableBreakPoints();

   useEffect(() => {
      if (!el.current) return;
   }, []);
   console.log(repositionByIndex(1));

   return (
      <>
         {/* contents */}
         {projects.map((project: ProjectsProps, index: number) => (
            <div
               key={index}
               className={classNames(
                  isOdd(index) ? 'lg:flex-row-reverse ' : 'lg:flex-row',
                  'xl:px-20',
                  'mx-auto flex w-full flex-col items-center gap-x-16 mb-6 lg:mb-0 lg:items-stretch'
               )}
            >
               <div
                  className={classNames(
                     'group transform transition-all duration-300 ease-in-out lg:mb-24 xl:mb-28'
                  )}
               >
                  {/* <Link className='z-0 lg:pointer-events-none' href={'/'}> */}
                  <div
                     className={classNames(
                        isOdd(index) ? 'lg:flex-row-reverse ' : 'lg:flex-row',
                        'flex px-6 py-2'
                     )}
                  >
                     <div
                        className={classNames(
                           //    isOdd(index) ? 'lg:-ml-6' : 'lg:-mb-8',
                           //    '                           bg-gray-700',
                           '-mt-8 max-w-2xl lg:w-96 lg:flex-none '
                        )}
                     >
                        <div className='lg:relative top-2 lg:h-full md:-mx-8 lg:mx-0 lg:hover:drop-shadow-2xl lg:hover:shadow-gray-800 lg:group-hover:translate-y-0'>
                           <Link
                              className='lg:pointer-events-auto lg:cursor-pointer lg:hover:opacity-90 lg:hover:-translate-y-3 transition-all duration-300 '
                              href={'/'}
                           >
                              <img
                                 className='absolute inset-0  h-full w-full rounded-2xl object-cover opacity-30 lg:opacity-100 lg:shadow-2xl lg:h-[70%] xl:h-[85%] lg:hover:-translate-y-3 transition-all duration-300'
                                 src={project.image}
                                 alt={project.title}
                              />
                           </Link>
                        </div>
                     </div>

                     {/* CONTENTS HERE */}
                     <div
                        className={classNames(
                           //    isOdd(index) ? 'md:-top-24 md:px-6' : 'md:-top-16 md:px-4',
                           //    'lg:px-28 lg:-mx-16 xl:px-64 xl:-mx-36',
                           'px-4 md:px-20 lg:max-w-xl',
                           'flex-grow items-center justify-start align-top self-start '
                           //   'flex relative inset-0 md:-top-24 z-20 w-full md:px-4 max-w-2xl lg:py-24 xl:mx-2 xl:px-20 xl:flex-auto'
                        )}
                     >
                        {/* //    className='relative -top-8 sm:-top-14 md:-top-16 z-20 w-full max-w-2xl lg:py-24 lg:px-4 xl:mx-2 xl:px-20 xl:flex-auto group-hover:-translate-y-3 lg:group-hover:translate-y-0'> */}
                        <div className='pb-4'>
                           <h3 className='font-serif text-2xl'>{project.title}</h3>
                        </div>
                        {/* description */}
                        <p className='font-medium mb-6 lg:mb-4 tracking-wide leading-5 md:leading-6 lg:leading-7'>
                           {project.description}
                        </p>
                        {/* ... */}
                        <ul
                           className='flex flex-row items-start justify-start gap-x-2 overflow-auto'
                           role='listitem'
                        >
                           {project.badge.map((badge, badgeIndex) => (
                              <li
                                 aria-label={badge}
                                 className='inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-blue-800'
                                 key={badgeIndex}
                              >
                                 {badge}
                              </li>
                           ))}
                        </ul>
                        <div className='flex flex-row items-start justify-start my-2 lg:hidden'>
                           <Link
                              className='my-2'
                              aria-label={`View source code for ${project.title}`}
                              href={'/'}
                           >
                              {/* link here */}
                              <GithubIcon className='block' width={25} height={25} />
                           </Link>
                        </div>
                        {/* ... */}
                     </div>
                  </div>
                  {/* </Link> */}
               </div>
               {/* numbering the project(?) / other details? */}
               {isDisabled && (
                  <SourceCode
                     isOdd={isOdd}
                     index={index}
                     aria-label={`View source code for ${project.title}`}
                  />
               )}
            </div>
         ))}
      </>
   );
};

export default Cards;

{
   /* contents */
}
//  {projects.map((project: ProjectsProps, index: number) => (
//     <div
//        key={index}
//        style={{
//         paddingLeft:
//        }}
//        className={classNames(
//           isOdd(index) ? 'lg:flex-row-reverse ' : 'lg:flex-row',
//         //   repositionByIndex(index),
//         //   //   'pl-10',
//           'bg-red-500 mx-auto flex max-w-5xl flex-col items-center gap-x-16 gap-y-10  lg:items-stretch group transform transition-all duration-300 ease-in-out'
//        )}
//     >
//        <div
//           className={classNames(
//              isOdd(index) ? 'lg:-ml-6' : 'lg:-mb-8',
//              '-mt-8 w-full max-w-2xl lg:w-96 lg:flex-none'
//           )}
//        >
//           <div className='md:relative aspect-[5/1] lg:h-full md:-mx-8 lg:mx-0 lg:aspect-square lg:hover:drop-shadow-2xl lg:hover:shadow-gray-800 group-hover:-translate-y-3 lg:group-hover:translate-y-0'>
//              <Link href={'/'}>
//                 <img
//                    className='absolute inset-0 -left-14 h-full w-full rounded-2xl object-cover opacity-30 lg:opacity-100 lg:shadow-2xl lg:h-[50%] lg:hover:opacity-90 lg:hover:-translate-y-3'
//                    src={project.image}
//                    alt={project.title}
//                 />
//              </Link>
//           </div>
//        </div>
//        {/* ... */}
//        <div
//           className={classNames(
//              isOdd(index) ? 'md:-top-24 md:px-6' : 'md:-top-16 md:px-4',
//              'relative -top-8 sm:-top-14 z-20 w-full max-w-2xl lg:py-24 xl:mx-2 xl:px-20 xl:flex-auto group-hover:-translate-y-3 lg:group-hover:translate-y-0'
//           )}
//        >
//           {/* //    className='relative -top-8 sm:-top-14 md:-top-16 z-20 w-full max-w-2xl lg:py-24 lg:px-4 xl:mx-2 xl:px-20 xl:flex-auto group-hover:-translate-y-3 lg:group-hover:translate-y-0'> */}
//           <div className='pb-4 '>
//              <h3 className='font-serif text-2xl'>{project.title}</h3>
//           </div>
//           {/* description */}
//           <p className='font-medium mb-6 lg:mb-4 tracking-wide leading-5 md:leading-6 lg:leading-7'>
//              {project.description}
//           </p>
//           {/* ... */}
//           <div className='flex flex-row items-start'>
//              <ul className='justify-start gap-x-2 overflow-auto' role='listitem'>
//                 {project.badge.map((badge, badgeIndex) => (
//                    <li
//                       aria-label={badge}
//                       className='inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-blue-700'
//                       key={badgeIndex}
//                    >
//                       {badge}
//                    </li>
//                 ))}
//              </ul>
//              <div className='flex flex-row items-start justify-start py-4 gap-x-1 lg:gap-x-2'>
//                 <Link
//                    aria-label={`View source code for ${project.title} on GitHub`}
//                    href={'/'}
//                 >
//                    {/* link here */}
//                    <GithubIcon className='' width={25} height={25} />
//                 </Link>
//              </div>
//           </div>
//           {/* ... */}
//        </div>
//     </div>
//  ))}
