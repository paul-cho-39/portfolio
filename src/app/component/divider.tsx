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

export const LabelDivider = ({ label }: { label: string }) => {
   return (
      <div className='relative'>
         <div className='absolute inset-0 flex items-center' aria-hidden='true'>
            <div className='w-full border-t border-gray-300' />
         </div>
         <div className='relative flex justify-center'>
            <span className='bg-white px-2 text-sm text-gray-500'>{label}</span>
         </div>
      </div>
   );
};
