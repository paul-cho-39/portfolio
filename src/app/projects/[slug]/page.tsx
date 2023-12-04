'use client';
import { useState, useEffect, cloneElement } from 'react';
// import Files from './../../posts/projects/'

export default function ProjectsPage(props: any) {
   //
   const slug = props.params.slug;

   //    const [MDXContent, setMDXContent] = useState<JSX.Element | undefined>(undefined);
   const [MDXContent, setMDXContent] = useState<JSX.Element | null>(null);
   const [error, setError] = useState(false);

   useEffect(() => {
      const loadMDX = async () => {
         try {
            // dynamically import the MDX file based on the slug
            const content = await import(`./../../posts/projects/${slug}.mdx`);
            // console.log('the content is: ', content.default());

            setMDXContent(content.default());
         } catch (err) {
            // handling error for fallback component
            setError(true);
            console.error('Error loading MDX file:', err);
         }
      };

      loadMDX();
   }, [slug]);

   if (error) {
      return (
         <div className='text-2xl dark:text-gray-300'>Cannot find the page you are looking for</div>
      );
   }

   if (!MDXContent) return <div>Loading...</div>;

   return <div>{MDXContent && cloneElement(MDXContent, { key: slug })}</div>;
}

// dynamic approach(?)
