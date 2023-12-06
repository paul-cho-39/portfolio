import NavigationButton from '@/app/component/buttons/navigationButton';
import { MainTitleContainer } from '@/app/component/headers/blog';
import WebPagePreview from '@/app/component/webPagePreview';
import getMarkdownMetaData, {
   getMarkdownContent,
   getNextAndPrevMdx,
} from '@/app/library/mdx/getMarkdownData';

import { ClockIcon, CalendarIcon, TagIcon } from '@heroicons/react/24/outline';

import Markdown from 'markdown-to-jsx';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
   const contents = getMarkdownMetaData('projects');
   return contents.map((content) => ({
      slug: content.slug,
   }));
}

export default function Projects({ params }: { params: { slug: string } }) {
   const slug = params.slug;

   const allSlugs = getMarkdownMetaData('projects').map((content) => content.slug);
   const { prevSlug, nextSlug } = getNextAndPrevMdx(slug, allSlugs);
   const content = getMarkdownContent('projects', slug);

   if (!content || !content.content) {
      return notFound();
   }

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
      <div className='max-w-2xl lg:max-w-[52rem] xl:max-w-[54rem] prose lg:text-lg'>
         {/* <NavigationButton
            navType='next'
            next={nextSlug as string}
            className='absolute top-[50%] left-6 bg-red-500'
         /> */}
         <MainTitleContainer
            // title='How does it feel like it is at the end?'
            title={content.data.title}
            items={metaDataItems}
         />
         <Markdown options={{ wrapper: 'article' }}>{content.content}</Markdown>
      </div>
   );
}

/**
 * Using just @next/mdx but I don't know how it will be statically generated
 * So changing it to where it will be statically loaded
 */
// export default function ProjectsPage(props: any) {
//    //
//    const slug = props.params.slug;

//    //    const [MDXComponent, setMDXComponent] = useState<JSX.Element | undefined>(undefined);
//    const [MDXComponent, setMDXComponent] = useState<JSX.Element | null>(null);
//    const [error, setError] = useState(false);

//    useEffect(() => {
//       const loadMDX = async () => {
//          try {
//             // dynamically import the MDX file based on the slug
//             const content = await import(`./../../posts/projects/${slug}.mdx`);
//             setMDXComponent(content.default());
//          } catch (err) {
//             // handling error for fallback component
//             setError(true);
//             console.error('Error loading MDX file:', err);
//          }
//       };

//       loadMDX();
//    }, [slug]);

//    // TODO: return 404 page here
//    if (error) {
//       return (
//          <div className='text-2xl dark:text-gray-300'>Cannot find the page you are looking for</div>
//       );
//    }

//    // TODO: return loading page here
//    if (!MDXComponent) return <div>Loading...</div>;

//    return <div>{MDXComponent && cloneElement(MDXComponent, { key: slug })}</div>;
// }
