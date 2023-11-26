import { ArrowTopRightOnSquareIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { GithubIcon } from '../fab/contacts';

interface ProjectActionsProps {
   title: string;
   githubUrl: string;
   projectUrl: string;
}

const ProjectLinks = ({ title, githubUrl, projectUrl }: ProjectActionsProps) => {
   return (
      <div className='flex flex-row items-start justify-start my-2 gap-x-4 lg:hidden'>
         <button aria-label={`View source code for ${title}`} className='focus:outline-none'>
            <Link href={githubUrl}>
               <GithubIcon className='w-6 h-6' />
            </Link>
         </button>

         <button aria-label={`View project ${title}`} className='focus:outline-none'>
            <Link href={projectUrl}>
               <ArrowTopRightOnSquareIcon className='w-6 h-6' />
            </Link>
         </button>
      </div>
   );
};

export default ProjectLinks;
