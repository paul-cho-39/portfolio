import NavigationButton from '@/app/component/buttons/navigationButton';
import { MainTitleContainer } from '@/app/component/headers/blog';
import WebPagePreview from '@/app/component/webPagePreview';
import getMarkdownMetaData, {
   getAllMdxNotCurrent,
   getMarkdownContent,
   getNextAndPrevMdx,
} from '@/app/library/mdx/getMarkdownData';

import { ClockIcon, CalendarIcon, TagIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';

import Markdown from 'markdown-to-jsx';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata(
   { params }: { params: { slug: string } },
   parent: ResolvingMetadata
): Promise<Metadata> {
   const project = getMarkdownMetaData('projects').find((project) => project.slug === params.slug);
   return {
      title: project?.title,
      authors: { name: 'Paul Cho' },
   };
}

export function generateStaticParams() {
   const contents = getMarkdownMetaData('projects');
   return contents.map((content) => ({
      slug: content.slug,
   }));
}

export default function Projects({ params }: { params: { slug: string } }) {
   const currentPost = params.slug;

   const allSlugs = getMarkdownMetaData('projects').map((content) => content.slug);
   const otherProjects = getAllMdxNotCurrent(currentPost, allSlugs);
   const content = getMarkdownContent('projects', currentPost);

   if (!content || !content.content) {
      return notFound();
   }

   console.log('all the other projects are: ', otherProjects);

   const metaDataItems = [
      {
         icon: ClockIcon,
         title: 'Total Time',
         value: content.data.totalReadingTime,
      },
      {
         icon: CalendarIcon,
         title: 'Date',
         value: content.data.date,
      },
      {
         icon: TagIcon,
         title: 'Keywords',
         value: content.data.keywords,
      },
   ];

   return (
      <div className='w-full h-full mx-auto flex justify-center bg-blue-200'>
         <main
            className={classNames(
               'prose-a:decoration-blue-500',
               'w-full max-w-2xl prose text-lg prose-p:leading-8 bg-purple-300 '
            )}
         >
            <MainTitleContainer title={content.data.title} items={metaDataItems} />
            <Markdown options={{ wrapper: 'article' }}>{content.content}</Markdown>
         </main>
      </div>
   );
}

// create a wrapper for the button and have it as an absolute position
// providing a key and a value?

// <div className='w-full h-full mx-auto md:grid md:grid-cols-5 lg:grid-cols-7 bg-blue-200'>
//    <div className='px-2 md:px-6 md:py-4 w-full md:col-span-4 lg:col-span-5 bg-slate-300'>
//       <div className='bg-lime-400 px-2 md:px-4 lg:px-8 xl:px-10 flex flex-col items-center justify-center'>
//          <div className='w-full lg:flex lg:flex-col lg:items-start lg:justify-center max-w-4xl prose bg-purple-300 '>
//             <MainTitleContainer title={content.data.title} items={metaDataItems} />
//             <Markdown options={{ wrapper: 'article' }}>{content.content}</Markdown>
//          </div>
//       </div>
//    </div>
//    <aside className='bg-red-500 col-span-1 lg:col-span-2 h-full'>
//       <div className='px-2'></div>
//       <NavigationButton
//          navType='prev'
//          isDisplayed={true}
//          next={prevSlug as string}
//          className='absolute top-[85%] right-5 bg-blue-300'
//       />
//       <NavigationButton
//          navType='next'
//          isDisplayed={true}
//          next={nextSlug as string}
//          className='absolute top-[85%] right-3 bg-blue-300'
//       />
//    </aside>
// </div>
// <div className='w-full h-full mx-auto md:grid md:grid-cols-5  bg-blue-200'>
//    <div className='px-4 sm:px-6 md:py-4 w-full md:col-span-5 lg:col-start-1 xl:col-start-2 lg:col-span-5 xl:col-span-4 bg-slate-300'>
//       <div className='w-full max-w-2xl prose text-lg prose-p:leading-8 bg-purple-300 '>
//          <MainTitleContainer title={content.data.title} items={metaDataItems} />
//          <Markdown options={{ wrapper: 'article' }}>{content.content}</Markdown>
//       </div>
//    </div>
//    <aside className='bg-red-500 col-span-1 lg:col-span-2 h-full'>
//       <div className='px-2'></div>
//       <NavigationButton
//          navType='prev'
//          isDisplayed={true}
//          next={prevSlug as string}
//          className='absolute top-[85%] right-5 bg-blue-300'
//       />
//       <NavigationButton
//          navType='next'
//          isDisplayed={true}
//          next={nextSlug as string}
//          className='absolute top-[85%] right-3 bg-blue-300'
//       />
//    </aside>
