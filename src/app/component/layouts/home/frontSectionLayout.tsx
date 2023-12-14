import React, { forwardRef } from 'react';
import { useDisableBreakPoints } from '@/app/library/hooks/useDisableBreakPoints';

const FrontPageLayout = forwardRef<React.ElementRef<'div'>, React.ComponentPropsWithoutRef<'div'>>(
   function OuterContainer({ children, ...props }, ref) {
      const isMedium = useDisableBreakPoints();
      const HEIGHT = !isMedium ? '100vh' : '150vh';
      console.log('is it medium currently?: ', isMedium);
      return (
         <section id='home'>
            <div
               ref={ref}
               style={{
                  width: '100%',
                  height: `${HEIGHT}`,
                  overflow: 'hidden',
               }}
               className='sky-gradient relative inset-0 z-20'
               {...props}
            >
               {children}
            </div>
         </section>
      );
   }
);

export default FrontPageLayout;
