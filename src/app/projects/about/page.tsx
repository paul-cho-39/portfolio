import { Metadata, ResolvingMetadata } from 'next';
import AboutMe from '@/posts/about/title.mdx';
import classNames from 'classnames';

type Props = {
   params: { id: string };
   searchParams: { [key: string]: string | string[] | undefined };
};

export function generateMetadata(): Metadata {
   return {
      title: 'About Paul Cho',
      description: 'Biography of Paul Cho and his journey to software engineer',
      authors: { name: 'Paul Cho' },
      creator: 'Paul Cho',
      keywords: ['Biography', 'About me', 'Portfolio'],
   };
}

export default function Page(props: any) {
   return (
      <main className='w-full h-full mx-auto flex justify-center '>
         {/* <div className='bg-lime-400 px-2 md:px-4 lg:px-8 xl:px-10 flex flex-col items-center justify-center prose'> */}
         <div
            className={classNames(
               'prose-a:no-underline prose-a:blue-highlight',
               'prose-headings:dark:text-gray-300 prose-headings:dark:font-bold',
               'w-full lg:max-w-2xl prose text-lg prose-p:leading-8'
            )}
         >
            <AboutMe />
         </div>
      </main>
   );
}
