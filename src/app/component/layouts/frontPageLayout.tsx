const FronPageLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <div
         style={{
            width: '100%',
            height: '100vh',
            overflow: 'hidden',
         }}
         className='sky-gradient relative inset-0 z-20'
      >
         {children}
      </div>
   );
};

export default FronPageLayout;
