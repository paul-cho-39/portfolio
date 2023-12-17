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
      <div className='max-w-2xl lg:max-w-[52rem] xl:max-w-[54rem] prose lg:text-lg'>
         <AboutMe />
      </div>
   );
}
