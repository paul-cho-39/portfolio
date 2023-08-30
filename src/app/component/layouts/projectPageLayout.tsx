// use previousPathName for stacking(?) but I think it already is stack on its own?

import { Router, useRouter } from 'next/router';
import { Container } from './container';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

// TEST THIS OUT -- for back enability
// put this in a layout page?
// retrieve the index of the project

interface ProjectLayoutsParam {
   projects?: Record<string, unknown>; // unknown for now
   children?: React.ReactNode;
}

const ProjectLayout = ({ projects, children }: ProjectLayoutsParam) => {
   const router = useRouter();
   return (
      <Container className='mt-16 lg:mt-32'>
         <div className='xl:relative'>
            {/* fill in the logic here */}
            <div className='mx-auto max-w-2xl'>
               <button
                  type='button'
                  onClick={() => router.back()}
                  aria-label='Go back to previous main page'
                  className=''
               >
                  <ArrowLeftIcon className='h-6 w-6' />
               </button>
               <article>
                  <header className='flex flex-col'>
                     <h1>Title</h1>
                     {/* here create another component */}
                  </header>
                  <div>{children}</div>
               </article>
            </div>
         </div>
      </Container>
   );
};

export default ProjectLayout;

// CONDITIONS:
// use framer-motion for writing the the

// grids - three grids (?) - the main, reference, and reference table?

// create a container for
// 1) tags 2) reading time 3) site (if there is a site) 4) view source code

// prev / next unless (project[0]) || project[-1]) should be filtered
