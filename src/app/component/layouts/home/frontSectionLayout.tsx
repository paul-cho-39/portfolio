import React, { forwardRef } from 'react';

// const FronPageLayout = forwardRef<
//    React.ElementRef<'div'>,
//    React.ComponentPropsWithoutRef<'div'>
// > => ({ children, ...props }, ref) => ({
// // ({ children }: { children: React.ReactNode }) => {
//    return (
//       <section >
//       <div
//          style={{
//             width: '100%',
//             height: '100vh',
//             overflow: 'hidden',
//          }}
//          className='sky-gradient relative inset-0 z-20'
//          >
//          {children}
//       </div>
//          </section>
//    );
// });

const FrontPageLayout = forwardRef<React.ElementRef<'div'>, React.ComponentPropsWithoutRef<'div'>>(
   function OuterContainer({ children, ...props }, ref) {
      return (
         <section>
            <div
               ref={ref}
               style={{
                  width: '100%',
                  height: '100vh',
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
