import { Metadata, ResolvingMetadata } from 'next';
import AboutMe from '@/posts/about/title.mdx';

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
      <div className='w-full h-full mx-auto md:grid md:grid-cols-5 py-4 lg:py-8 '>
         <div className='px-4 sm:px-6 md:py-4 w-full md:col-span-4 lg:col-span-5 md:col-start-2 lg:col-start-2'>
            {/* <div className='bg-lime-400 px-2 md:px-4 lg:px-8 xl:px-10 flex flex-col items-center justify-center prose'> */}
            <div className='w-full lg:max-w-2xl prose text-lg prose-p:leading-8'>
               <AboutMe />
            </div>
         </div>
      </div>
   );
}
