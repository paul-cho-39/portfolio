import { Barlow_Condensed } from 'next/font/google';

const barlowCondensed = Barlow_Condensed({
   weight: '700',
   style: ['normal', 'italic'],
   variable: '--font-barlow-condensed',
   subsets: ['latin'],
});

const InitialLogo = () => {
   return (
      <div className={`${barlowCondensed.variable} font-sans italic`}>
         {/* <div className='text-2xl relative rotate-[353deg]'>
            <span className='text-2xl z-10 relative outline-[#BCB5FF] rotate-[353deg] shadow-[#F1F1F1] outline-8 drop-shadow-lg backdrop-opacity-95 '>
               PCK
            </span>
            <span className='relative right-0  z-0 text-2xl text-[#6558DD] outline-[#FFB5FD] outline-8 rotate-[353deg] shadow-[#6558DD] blur-[1.5px] shadow-sm drop-shadow-md'>
               PCK
            </span>
            <span className='relative right-0 z-0 text-2xl text-[#D76196] outline-[#FFB5E7] outline-8 rotate-[353deg] shadow-[#F53939] blur-[1.5px] shadow-sm drop-shadow-md'>
               PCK
            </span>
         </div> */}
         <div className='flex'>
            <h1 className='text-2xl font-bold animate-neon'>LOGO</h1>
         </div>
      </div>
   );
};

export default InitialLogo;
