import Link from 'next/link';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import ROUTES from '@/app/utils/routes';
import classNames from 'classnames';
import { capitalizeFirstLetter } from '@/app/library/helpers/formatChar';

interface NavigationButtonProps {
   next: string;
   navType: 'next' | 'prev';
   isDisplayed?: boolean;
   className?: string;
}

/**
 *
 */
const NavigationButton = ({ next, navType, isDisplayed, className }: NavigationButtonProps) => {
   const SR_TEXT = navType === 'next' ? 'next project' : 'previous project';
   const HOVER_TEXT = navType === 'next' ? 'Next' : 'Previous';

   return (
      <div className={classNames(className, isDisplayed && isDisplayed ? 'visible' : 'invisible')}>
         <Link href={ROUTES.PROJECTS.NEXT_PROJECT(next)} className='group'>
            {navType === 'next' ? (
               <ChevronRightIcon className='w-8 h-8 lg:w-10 lg:h-10 dark:text-gray-300' />
            ) : (
               <ChevronLeftIcon className='w-8 h-8 lg:w-10 lg:h-10 dark:text-gray-300' />
            )}
            <span className='sr-only'>{SR_TEXT}</span>
            <span
               className={classNames(
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
