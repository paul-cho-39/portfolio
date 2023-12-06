import Link from 'next/link';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import ROUTES from '@/app/utils/routes';
import classNames from 'classnames';
import { capitalizeFirstLetter } from '@/app/library/helpers/formatChar';

interface NavigationButtonProps {
   next: string;
   navType: 'next' | 'prev';
   className?: string;
}

const NavigationButton = ({ next, navType, className }: NavigationButtonProps) => {
   const SR_TEXT = navType === 'next' ? 'next project' : 'previous project';
   const HOVER_TEXT = navType === 'next' ? 'Next' : 'Previous';

   return (
      <div className={className}>
         <Link href={ROUTES.PROJECTS.NEXT_PROJECT(next)} className='group'>
            {navType === 'next' ? (
               <ChevronRightIcon className='w-8 h-8 dark:text-gray-300' />
            ) : (
               <ChevronLeftIcon className='w-8 h-8 dark:text-gray-300' />
            )}
            <span className='sr-only'>{SR_TEXT}</span>
            <span
               className={classNames(
                  //   navType === 'next' ? '-translate-x-4' : 'translate-x-4',
                  'hidden group-hover:block group-hover:opacity-100 absolute translate-y-3 transition-all duration-100 ease-in'
               )}
            >
               {HOVER_TEXT}: {capitalizeFirstLetter(next)}
            </span>
         </Link>
      </div>
   );
};

// should appear at the end of the page?
// when the page is at its end then have it displayed there?

export default NavigationButton;
