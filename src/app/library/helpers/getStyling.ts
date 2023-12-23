import { Scroll } from '../hooks/useScrollDirection';

export const HOME_COLOR = 'bg-[#184888]';
export const DEFAULT_COLOR = 'bg-white dark:bg-zinc-800';

export function getPosition(
   isHome: boolean,
   isTop: boolean,
   scrollDirection: Scroll | null
   // position: 'relative' | 'fixed' = 'relative'
) {
   if (isHome) return '';

   if (!isTop && scrollDirection === 'down') return 'hidden ';

   if (scrollDirection === 'up') return 'relative';
}

export function getBgColor(isHome: boolean, isTop: boolean) {
   if (!isHome) return DEFAULT_COLOR;

   return HOME_COLOR;
}
