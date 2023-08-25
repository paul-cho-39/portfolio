import classNames from '@/app/library/helper';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { GithubIcon } from '../fab/contacts';

interface SourceCodeProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
   index: number;
   isOdd: (idx: number) => boolean;
   'aria-label'?: string;
   'aria-labelledby'?: string;
}

export const SourceCode = ({ isOdd, index, ...props }: SourceCodeProps) => {
   return (
      <div
         className={classNames(
            isOdd(index) ? 'lg:-mr-24' : 'lg:-ml-24',
            // '                           bg-gray-700',
            'lg:flex lg:flex-col items-center justify-start lg:pb-28 xl:pb-16'
         )}
      >
         <Link className='my-6' {...props} href={'/'}>
            {/* link here */}
            <GithubIcon className='block' width={25} height={25} />
         </Link>
         <Link {...props} href={'/'}>
            <ArrowTopRightOnSquareIcon className='my-2 w-[25px] h-[25px]' />
         </Link>
      </div>
   );
};
