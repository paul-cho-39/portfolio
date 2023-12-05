import getMarkdownMetaData, { getMarkdownContent } from '@/app/library/mdx/getMarkdownData';
import Markdown from 'markdown-to-jsx';

export function generateStaticParams() {
   const contents = getMarkdownMetaData('projects');
   return contents.map((content) => ({
      slug: content.slug,
   }));
}

export default function Projects({ params }: { params: { slug: string } }) {
   const slug = params.slug;
   console.log('THE SLUG IS CORRECTLY IDENTIFIED', slug);

   const content = getMarkdownContent('projects', slug);

   if (!content || !content.content) {
      return <div className='text-4xl text-red-500'>Not Found</div>;
   }

   return (
      <div className='prose'>
         <h1 className='prose-2xl prose-h1:text-4xl'>{content.data.title}</h1>
         <Markdown options={{ wrapper: 'article' }}>{content.content}</Markdown>
      </div>
   );
}

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

// dynamic approach(?)
