import ROUTES from '@/app/utils/routes';
import classNames from 'classnames';

export const HeaderTitle = () => {
   return (
      <nav className='h-16 fixed flex items-center justify-center px-10 z-50'>
         <a href={ROUTES.HOME} aria-label='Home' className='cursor-pointer'>
            <span className='font-bold font-mono text-lg leading-tight text-[#221c14] dark:text-gray-50'>
               paul cho
            </span>
         </a>
      </nav>
   );
};

export default HeaderTitle;
