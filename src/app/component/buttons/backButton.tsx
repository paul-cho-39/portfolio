import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface BackButtonProps {
   showBackText: boolean;
}

const BackButton = ({ showBackText }: BackButtonProps) => {
   const [isHovered, setHovered] = useState(false);
   const router = useRouter();

   const handleMouseEnter = () => {
      if (!showBackText) setHovered(false);

      setHovered(true);
   };

   return (
      <div className='dark:text-slate-200'>
         <button
            onClick={() => router.back()}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setHovered(false)}
            aria-label='Go back to previous main page'
            className='dark:slate-text-200 flex'
         >
            <ArrowLeftIcon
               aria-hidden={true}
               className='h-10 w-10 hover:outline-2 hover:outline-black'
            />
            <span className='sr-only'>Back button</span>
            {showBackText && (
               <span className={classNames(isHovered ? 'relative top-0 left-2' : 'hidden')}>
                  Back
               </span>
            )}
         </button>
      </div>
   );
};

export default BackButton;
