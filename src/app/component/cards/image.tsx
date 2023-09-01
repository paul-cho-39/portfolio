import Image, { ImageProps } from 'next/image';
import Link from 'next/link';
import { GithubIcon } from '../fab/contacts';
import { useState } from 'react';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import classNames from '@/app/library/helper';

interface ProjectImageProps extends ImageProps {
   src: string;
   alt: string;
   title: string;
}

export const ProjectImage = () =>
   // props?: ImageProps
   {
      const [isHovered, setIsHovered] = useState({ github: false, project: false });

      const handleHoverImage = (type: 'github' | 'project' | 'none') => {
         const newState = { github: false, project: false };

         if (type !== 'none') {
            newState[type] = true;
         }

         setIsHovered(newState);
      };

      return (
         <div
            className='relative group w-[100%] lg:flex-none lg:w-[50%] xl:w-[55%] overflow-hidden'
            //  className=' group h-[300px] md:h-[400px] lg:h-[500px] lg:flex-none lg:w-[40%] xl:w-[35%] overflow-hidden'
         >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
               src={
                  'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80'
               }
               alt='source'
               // className='lg:absolute lg:inset-0 h-full w-full object-cover rounded-xl transform group-hover:opacity-60 group-hover:object-top group-hover:rounded-3xl transition-all duration-400 ease-in'
               className='lg:absolute lg:inset-0 h-full w-full object-cover rounded-lg transform group-hover:opacity-60 group-hover:scale-110 group-hover:rounded-3xl transition-all duration-500 ease-in-out'
            />
            <div
               // className='bg-red-500 h-full w-full grid grid-rows-2 opacity-0 group-hover:opacity-95 transition-opacity duration-150 ease-in'
               className='absolute inset-0 h-full w-full grid grid-rows-2 opacity-0 group-hover:opacity-95 transition-opacity duration-150 ease-in'
            >
               <Link
                  // className='row-span-1 border-b-[0.5px] border-slate-800'
                  className={classNames(
                     isHovered.github ? 'opacity-80' : 'opacity-20',
                     'row-span-1 border-b-[0.5px] border-slate-800 z-30'
                  )}
                  href='#'
                  aria-label={`View source code for ${'title'}`}
                  onMouseEnter={() => handleHoverImage('github')}
                  onMouseLeave={() => handleHoverImage('none')}
               >
                  <GithubIcon className='absolute top-2 right-2 w-8 h-8 hover:stroke-slate-400 hover:fill-slate-400' />
               </Link>
               <Link
                  className={classNames(
                     isHovered.project ? 'opacity-80' : 'opacity-20',
                     'row-span-2  z-30'
                  )}
                  href='#'
                  aria-label={`Go to the project ${'title'}`}
                  onMouseEnter={() => handleHoverImage('project')}
                  onMouseLeave={() => handleHoverImage('none')}
               >
                  <ArrowTopRightOnSquareIcon className='absolute top-[53%] right-2 w-8 h-8 hover:stroke-slate-400' />
               </Link>
            </div>
         </div>
      );
   };

// initial idea:
// when hovered, github and link icons will appear
// the icons should be absolute and have lower z-index
// once it is hovered, the opacity of image lowers and the hover button appears
// use isHovered state then on the bottom small <p>show project</p>

// TWO THINGS TO FIX:
