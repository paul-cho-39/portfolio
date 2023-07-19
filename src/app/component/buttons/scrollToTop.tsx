import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
   const [isVisible, setIsVisible] = useState(false);

   // Show button when page is scrolled down
   useEffect(() => {
      const toggleVisibility = () => {
         if (window.scrollY > 300) {
            setIsVisible(true);
         } else {
            setIsVisible(false);
         }
      };

      window.addEventListener('scroll', toggleVisibility);

      return () => window.removeEventListener('scroll', toggleVisibility);
   }, []);
   1;

   // Scroll to top smoothly
   const scrollToTop = () => {
      window.scrollTo({
         top: 0,
         behavior: 'instant',
      });
   };

   return (
      <>
         {isVisible && (
            <button
               onClick={scrollToTop}
               className='fixed bottom-4 right-4 p-2 bg-blue-500 text-white rounded'
            >
               ICON HERE
            </button>
         )}
      </>
   );
};

export default ScrollToTopButton;
