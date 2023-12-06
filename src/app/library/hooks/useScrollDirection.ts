import { useEffect, useState } from 'react';

export type Scroll = 'up' | 'down';

const THRESHOLD = 75;

export function useScrollDirection() {
   const [scrollDirection, setScrollDirection] = useState<Scroll | null>(null);
   const [isTop, setIsTop] = useState(true);

   useEffect(() => {
      let lastScrollY = window.scrollY;

      console.log('last scroll Y is: ', lastScrollY);

      const updateScrollDirection = () => {
         const scrollY = window.scrollY;
         const direction = scrollY > lastScrollY ? 'down' : 'up';
         if (
            direction !== scrollDirection &&
            (scrollY - lastScrollY > 5 || scrollY - lastScrollY < -5)
         ) {
            setScrollDirection(direction);
         }
         lastScrollY = scrollY > 0 ? scrollY : 0;
         setIsTop(lastScrollY <= THRESHOLD);
      };

      window.addEventListener('scroll', updateScrollDirection);

      return () => {
         window.removeEventListener('scroll', updateScrollDirection);
      };
   }, [scrollDirection]);

   return { scrollDirection, isTop };
}
