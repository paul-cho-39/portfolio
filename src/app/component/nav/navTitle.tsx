import classNames from 'classnames';

export const HeaderTitle = () => {
   return (
      <nav className='h-16 fixed flex items-center justify-center px-10 z-50'>
         <a href='/' aria-label='Home' className='cursor-pointer'>
            <span className='font-bold font-mono text-lg leading-tight text-[#4c4439]'>
               paul cho
            </span>
         </a>
      </nav>
   );
};

export default HeaderTitle;
