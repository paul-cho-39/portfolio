import { Toggler } from '@/app/component/buttons/toggler';
import BackButton from '@/app/component/buttons/backButton';
import { useScrollDirection } from '@/app/library/hooks/useScrollDirection';

import classNames from 'classnames';

const AsideWrapper = ({}) => {
   const { isTop, scrollDirection } = useScrollDirection();

   const hideAside = !isTop && scrollDirection === 'down';
   return (
      <aside className='col-span-2 md:mt-2 lg:mt-4'>
         {/* <div className='w-full flex flex-row items-center '> */}
         <div
            className={classNames(
               hideAside ? 'hidden' : 'fixed',
               'md:min-h-[80%] lg:w-20 md:w-16 md:flex flex-col p-4 hidden items-center justify-center transition-all duration-200 ease-linear'
            )}
         >
            {/* <div className='absolute top-4 left-[50%]'>
               <BackButton showBackText={true} />
            </div> */}
            <div
               className={classNames(
                  hideAside ? 'hidden' : 'absolute',
                  'top-[40%] left-[100%] bg-white'
               )}
            >
               <Toggler isHidden={hideAside} />
            </div>
         </div>
         {/* </div> */}
      </aside>
   );
};

export default AsideWrapper;
