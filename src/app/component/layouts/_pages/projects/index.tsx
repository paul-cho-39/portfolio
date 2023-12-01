// use previousPathName for stacking(?) but I think it already is stack on its own?

import { Router, useRouter } from 'next/router';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Container } from '../../container';

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
               {/* use this back button for the common layout */}
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
