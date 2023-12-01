import { Container } from '../container';
import { useState } from 'react';
import classNames from 'classnames';

/**
 * all pages will contain page structure
 * page layout for any page that requires markdown which are blogs
 * the content leans in the left side but goes more to the left
 */

interface BlogLayoutParams {
   isOpenAside: boolean;
   children?: React.ReactNode;
}

export const BodyLayout = ({ isOpenAside, children }: BlogLayoutParams) => {
   //    const [isOpenAside, setOpenAside] = useState(false);

   return (
      <Container>
         <div className={classNames(isOpenAside ? 'max-w-2xl' : 'max-w-4xl', 'mx-auto p-5')}>
            <main>
               <article>{children}</article>
            </main>
         </div>
      </Container>
   );
};

export const SideContentLayout = ({ isOpenAside, children }: BlogLayoutParams) => {
   return (
      <aside className={classNames(isOpenAside ? 'w-72 p-5' : 'hidden')}>
         <p>{children}</p>
      </aside>
   );
};

// at the bottom create 'contact me'
// button
const ContactSection = () => {
   return (
      <div>
         Have questions? Want to connect? Shoot me a mail!
         {/* input mail here */}
      </div>
   );
};

// create 'next' and 'prev'
