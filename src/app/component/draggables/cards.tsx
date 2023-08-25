import Cards from '../cards/cards';
import { Title } from '../cards/sectionTitle';
import { GithubIcon } from '../fab/contacts';
import { ProjectLayout } from '../layouts/project';

import data from '@/constants/data/projects.json';

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
}

const ProjectCards = ({}) => {
   return (
      <section className='bg-slate-100'>
         {/* project title here */}
         <Title title='Some Stuff I Built' />
         <ProjectLayout>
            <Cards projects={data.projects} />
         </ProjectLayout>
      </section>
   );
};

export default ProjectCards;

//    return (
//     <section className='bg-slate-100'>
//     {/* project title here */}
//     <div className='relative w-full mt-6 py-8 mb-6 sm:top-2 sm:mb-2 md:mb-0 lg:top-12 lg:py-0'>
//        <h1 className='text-left text-xl px-8 md:text-3xl lg:px-12 dark:text-slate-100'>
//           Some Stuff I Built
//        </h1>
//     </div>
//     {/* <div
//        className='lg:hidden md:bg-opacity-20 md:bg-cover md:bg-center'
//        style={{
//           backgroundImage: `url(https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80)`,
//        }}
//     > */}
//     <div className='mx-auto px-4 my-8 lg:my-0 lg:mb-0 lg:px-8'>
//        {/* mapping the project from here */}
//        <div className='relative z-10 bg-slate-200 sm:mt-28 sm:pb-24 md:px-12 lg:mt-44'>
//           {/* <div className='absolute inset-0 overflow-hidden' aria-hidden='true'>
//              <div className='absolute left-[calc(50%-19rem)] top-[calc(50%-36rem)] transform-gpu blur-3xl'>
//                 <div
//                    className='aspect-auto w-[68.5625rem] bg-gradient-to-r from-[#d1d0d0] to-[#9a99b7] opacity-25'
//                    style={{
//                       clipPath:
//                          'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
//                    }}
//                 />
//              </div>
//           </div> */}

//           {/* images plus contents  */}

//           <div className='mx-auto flex max-w-5xl flex-col items-center gap-x-16 gap-y-10 px-6 sm:gap-y-8 md:px-10 lg:flex-row lg:items-stretch group transform transition-all duration-300 ease-in-out'>
//              {/* images available only for lg and xl */}
//              {/* images -- create a separate component */}
//              <div className='-mt-8 w-full max-w-2xl lg:-mb-8 lg:w-96 lg:flex-none'>
//                 <div className='md:relative aspect-[5/1] lg:h-full md:-mx-8 lg:mx-0 lg:aspect-auto lg:hover:drop-shadow-2xl lg:hover:shadow-gray-800 lg:hover:-translate-y-3'>
//                    <img
//                       className='absolute inset-0 h-full w-full rounded-2xl object-cover opacity-30 lg:opacity-100 lg:shadow-2xl lg:h-[80%] lg:-w-[80%] lg:hover:opacity-90 group-hover:-translate-y-3 lg:group-hover:translate-y-0'
//                       src='https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80'
//                       alt=''
//                    />
//                 </div>
//              </div>
//              {/* set this position to relative */}
//              <div className='relative -top-8 sm:-top-14 md:-top-16 z-20 w-full max-w-2xl lg:py-24 lg:px-4 xl:mx-2 xl:px-20 xl:flex-auto group-hover:-translate-y-3 lg:group-hover:translate-y-0'>
//                 <div>
//                    <h3 className='font-serif text-2xl'>Project Name</h3>
//                 </div>

//                 {/* description */}
//                 <figure className='relative isolate pt-6 sm:pt-12'>
//                    <p className='font-medium mb-6 lg:mb-4'>
//                       Gravida quam mi erat tortor neque molestie. Auctor aliquet at porttitor a
//                       enim nunc suscipit tincidunt nunc. Et non lorem tortor posuere. Nunc eu
//                       scelerisque interdum eget tellus non nibh scelerisque bibendum.
//                    </p>
//                    <figcaption className='mt-4 lg:mt-8 text-base'>
//                       {/* tags - map it here */}
//                       <div className='flex flex-row items-start gap-x-1 overflow-auto'>
//                          {/* map the badges here */}
//                          <span className='inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-blue-700'>
//                             Badge
//                          </span>
//                          <span className='inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-blue-700'>
//                             Badge
//                          </span>
//                          <span className='inline-flex items-center rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-blue-700'>
//                             Badge
//                          </span>
//                          <span className='inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-blue-700'>
//                             Badge
//                          </span>
//                          <span className='inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700'>
//                             Badge
//                          </span>
//                          <span className='inline-flex items-center rounded-full bg-indigo-100 px-2 py-1 text-xs font-medium text-blue-700'>
//                             Badge
//                          </span>
//                       </div>
//                       <div>
//                          <button>
//                             <GithubIcon className='' width={25} height={25} />
//                          </button>
//                       </div>
//                    </figcaption>
//                 </figure>
//              </div>
//              {/* </div> */}
//           </div>
//        </div>
//     </div>
//  </section>
// );
