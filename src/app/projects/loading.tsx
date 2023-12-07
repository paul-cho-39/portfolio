export default function Loading() {
   // You can add any UI inside Loading, including a Skeleton.
   return (
      <div className='min-h-screen w-full relative dark:bg-zinc-800 bg-white'>
         <div className='loader absolute inset-20 border-4 border-gray-200 rounded-full w-10 h-10;'></div>
      </div>
   );
}
