import { DEFAULT_COLOR, HOME_COLOR } from '@/app/constants';
import { Scroll } from '../hooks/useScrollDirection';

export function getPosition(
   isHome: boolean,
   scrollDirection: Scroll | null
   // position: 'relative' | 'fixed' = 'relative'
) {
   if (isHome) return '';

   if (scrollDirection === 'down') return 'hidden ';

   if (scrollDirection === 'up') return 'relative';
}

export function getBgColor(isHome: boolean, isTop: boolean) {
   if (!isHome) return DEFAULT_COLOR;

   return HOME_COLOR;
}
