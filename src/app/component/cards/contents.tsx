import classNames from 'classnames';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { GithubIcon } from '../fab/contacts';

interface SourceCodeProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
   index: number;
   isOdd: (idx: number) => boolean;
   'aria-label'?: string;
   'aria-labelledby'?: string;
}

// TODO: when the icons are hovered show a preview(?) for the image(?)
//

export const SourceCode = ({ isOdd, index, ...props }: SourceCodeProps) => {
   return (
      <div
         className={classNames(
            isOdd(index) ? 'lg:-mr-24' : 'lg:-ml-24',
            'lg:flex lg:flex-col items-center justify-start lg:pb-28 xl:pb-16'
         )}
      >
         <Link
            className='my-6 z-50 stroke-stone-700 fill-stone-700 dark:stroke-gray-200/80 dark:fill-gray-200/80 hover:stroke-blue-500 hover:fill-blue-500 transform transition-all duration-300 ease-in-out hover:scale-110'
            // className='my-6 z-50 stroke-stone-700 fill-stone-700 dark:stroke-gray-200/80 dark:fill-gray-200/80 hover:stroke-blue-500 hover:fill-blue-500 dark:hover:stroke-slate-600 dark:hover:fill-slate-600'
            {...props}
            aria-label='go to github repo'
            href={'/'}
         >
            {/* link here */}
            <GithubIcon className='block' width={25} height={25} />
         </Link>
         <Link {...props} href={'/'}>
            <ArrowTopRightOnSquareIcon className='my-2 w-[25px] h-[25px] z-50 stroke-stone-700  dark:stroke-gray-200/80  hover:stroke-blue-500 transform transition-all duration-300 ease-in-out hover:scale-110' />
         </Link>
      </div>
   );
};
