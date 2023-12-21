import { Variants, motion } from 'framer-motion';
import classNames from 'classnames';
import useDarkTheme from '@/app/library/hooks/useDarkTheme';

interface TogglerProps {
   isHidden: boolean;
   isVertical?: boolean;
}

// a switch toggler compatible for both vertical and horizontal
export const Toggler = ({ isHidden, isVertical = true }: TogglerProps) => {
   const { theme, setTheme } = useDarkTheme();

   const toggleTheme = () => {
      const newTheme = theme === 'light' ? 'dark' : 'light';

      console.log('toggling theme');

      setTheme(newTheme);
   };

   // create an animation as if the ball is sliding
   const spring = {
      type: 'spring',
      duration: 0.4,
      stiffness: 200,
      damping: 35,
   };

   const isLight = theme === 'light';
   const sunStyle = 'bg-gradient-to-br from-yellow-200 to-orange-200';
   const moonStyle = 'bg-gradient-to-br from-gray-300 to-gray-500';

   const togglePosition = isVertical
      ? {
           top: isLight ? '100%' : '0%',
           y: isLight ? '-100%' : '0%',
           display: isHidden ? 'none' : 'block',
        }
      : {
           left: isLight ? '100%' : '0%',
           x: isLight ? '-100%' : '0%',
           display: isHidden ? 'none' : 'block',
        };

   return (
      <div
         className={classNames(
            isVertical ? 'w-10 h-16' : 'h-8 w-14 lg:w-14 lg:h-10',
            isLight ? 'bg-orange-200/40' : 'bg-slate-600',
            'p-0 cursor-pointer relative rounded-3xl'
         )}
         onClick={toggleTheme}
      >
         <motion.div
            initial={false}
            animate={togglePosition}
            className={classNames(
               isLight ? sunStyle : moonStyle,
               'bg-white relative left-0 w-8 h-8 md:w-10 md:h-10 rounded-full'
            )}
            layout
            transition={spring}
         />
      </div>
   );
};
