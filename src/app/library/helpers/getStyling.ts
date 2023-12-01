import { DEFAULT_COLOR, HOME_COLOR } from '@/app/constants';
import { Scroll } from '../hooks/useScrollDirection';

export function getPosition(
   isHome: boolean,
   scrollDirection: Scroll | null,
   position: 'relative' | 'fixed' = 'relative'
) {
   if (isHome) return 'fixed';

   if (scrollDirection === 'down') return 'hidden ';

   if (scrollDirection === 'up') return position;
}

export function getBgColor(isHome: boolean, isTop: boolean) {
   if (!isHome) return DEFAULT_COLOR;

   return isTop ? HOME_COLOR : DEFAULT_COLOR;
}
