'use client';
import { useState, useEffect, cloneElement } from 'react';
// import Files from './../../posts/projects/'

export default function ProjectsPage(props: any) {
   //
   const slug = props.params.slug;

   //    const [MDXComponent, setMDXComponent] = useState<JSX.Element | undefined>(undefined);
   const [MDXComponent, setMDXComponent] = useState<JSX.Element | null>(null);
   const [error, setError] = useState(false);

   useEffect(() => {
      const loadMDX = async () => {
         try {
            // dynamically import the MDX file based on the slug
            const content = await import(`./../../posts/projects/${slug}.mdx`);

            console.log('when calling the content is: ', content.default());
            console.log('-------------------');
            console.log('-------------------');
            console.log('-------------------');
            console.log('when NOT the content is: ', content.default);
            console.log('-------------------');
            console.log('-------------------');

            setMDXComponent(content.default());
         } catch (err) {
            // handling error for fallback component
            setError(true);
            console.error('Error loading MDX file:', err);
         }
      };

      loadMDX();
   }, [slug]);

   // TODO: return 404 page here
   if (error) {
      return (
         <div className='text-2xl dark:text-gray-300'>Cannot find the page you are looking for</div>
      );
   }

   // TODO: return loading page here
   if (!MDXComponent) return <div>Loading...</div>;

   return <div>{MDXComponent && cloneElement(MDXComponent, { key: slug })}</div>;
}

// dynamic approach(?)
