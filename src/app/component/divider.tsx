export const Divider = ({ top }: { top?: string }) => {
   const topPos = top ?? 'top-16';
   return (
      <div className={`fixed ${topPos} w-full h-[1px] z-50 px-6`}>
         <div className='w-full h-full bg-slate-50'></div>
      </div>
   );
};
