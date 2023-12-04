import { Variants, motion } from 'framer-motion';
import classNames from 'classnames';
import useDarkTheme from '@/app/library/hooks/useDarkTheme';

export const Toggler = () => {
   const { theme, setTheme } = useDarkTheme();

   const toggleTheme = () => {
      const newTheme = theme === 'light' ? 'dark' : 'light';

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
   const sunStyle = 'bg-gradient-to-br from-yellow-300 to-orange-300';
   const moonStyle = 'bg-gradient-to-br from-gray-300 to-gray-500';

   return (
      <div
         className={classNames(
            isLight ? 'bg-orange-200/40' : 'bg-slate-600',
            'w-8 h-16 p-0 cursor-pointer relative rounded-3xl'
         )}
         onClick={toggleTheme}
      >
         <motion.div
            initial={false}
            animate={{
               top: isLight ? '100%' : '0%',
               y: isLight ? '-100%' : '0%',
            }}
            className={classNames(
               isLight ? sunStyle : moonStyle,
               'bg-white absolute left-0 w-8 h-8 rounded-full'
            )}
            layout
            transition={spring}
         />
      </div>
   );
};
