import { useEffect, useState } from 'react';

const LARGE_BREAK_POINT = 933;

export const useDisableBreakPoints = () => {
   const [isDisabled, setIsDisabled] = useState(false);

   useEffect(() => {
      const handleResize = () => {
         if (window.innerWidth > LARGE_BREAK_POINT) {
            // You can set this to whatever breakpoint you want
            setIsDisabled(true);
         } else {
            setIsDisabled(false);
         }
      };
      handleResize();

      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
   }, []);

   return isDisabled;
};
