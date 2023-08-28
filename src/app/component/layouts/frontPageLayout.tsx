import WindowCanvas from '../effects/scene';
import { FrontCoverDescription } from '../frontCover';
import { ArrowDown } from '../illustrator/arrowDown';
import { Container } from './container';

const FronPageLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <div
         style={{
            width: '100%',
            height: '100vh',
         }}
         className='sky-gradient relative inset-0 z-20 '
         //  className='min-h-screen min-w-screen relative inset-0 z-20'
      >
         {children}
      </div>
   );
};

const FrontPage = () => {
   return (
      <section>
         <FronPageLayout>
            <WindowCanvas />
            <FrontCoverDescription
               main={
                  <>
                     <span>{'Paul |'}</span>
                     <br />
                     <span>Software Engineer</span>
                  </>
               }
               description={
                  "I'm a self-taught full-stack developer, I've navigated the tech landscape through hands-on experience. My journey into programming has been driven by curiosity and a passion for solving real-world problems"
               }
            />
            <ArrowDown />
         </FronPageLayout>
      </section>
   );
};

export default FrontPage;
