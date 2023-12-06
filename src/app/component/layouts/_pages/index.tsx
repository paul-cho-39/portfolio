import classNames from 'classnames';

/**
 * all pages will contain page structure
 * page layout for any page that requires markdown which are blogs
 * the content leans in the left side but goes more to the left
 */

interface BlogLayoutParams {
   isOpenAside?: boolean;
   children?: React.ReactNode;
}

export const BlogLayout = ({ isOpenAside, children }: BlogLayoutParams) => {
   //    const [isOpenAside, setOpenAside] = useState(false);

   return (
      <main>
         <div className='dark:text-gray-300 text-lg'>
            <article>{children}</article>
         </div>
      </main>
   );
};

export const SideContentLayout = ({ isOpenAside, children }: BlogLayoutParams) => {
   return (
      <aside className={classNames(isOpenAside ? 'w-72 p-5' : 'hidden')}>
         <p>{children}</p>
      </aside>
   );
};

// only for /about page
export const TitleContainer = ({ children }: { children: React.ReactNode }) => {
   return <div className='my-4 lg:my-8'>{children} </div>;
};

// at the bottom create 'contact me'
// email, insta, fb
export const ContactSection = () => {
   return (
      <div>
         Have questions? Want to connect? Shoot me a mail!
         {/* input mail here */}
      </div>
   );
};

// create 'next' and 'prev'
