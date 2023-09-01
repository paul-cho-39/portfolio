import clsx from 'clsx';

type CSSPosition = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
interface DividerProps {
   position: CSSPosition;
   className?: string;
   top?: string;
}

export const Divider = ({ position = 'fixed', className, top }: DividerProps) => {
   const topPos = top ?? 'top-16';
   return (
      <div className={`${position} ${topPos} w-full h-[1px] z-30 px-6`}>
         <div
            className={clsx(className, 'w-full h-full')}
            // 'w-full h-full bg-slate-50'
         ></div>
      </div>
   );
};
