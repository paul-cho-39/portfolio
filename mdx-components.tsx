import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
   return {
      h2: ({ children }) => (
         <h2 className='text-6xl font-mono font-semibold mb-4 dark:text-gray-200'>{children}</h2>
      ),
      p: ({ children }) => <p className='text-xl my-2 dark:text-gray-300'>{children}</p>,
      ...components,
   };
}

/**
 * Title - .mdx file and export it
 * Description -.mdx file and export it to about
 *
 *
 * 1) create /posts at the root
 * a) this is where all the mdx file is stored
 * b) about/ projects/
 * 2) create a path so that it reads the files
 * a) separate file and add this to where the project is
 * b) for /about it will be a bit different
 * 3) now make this readable (except 'about') section
 * a) create another function where it takes the 'slug' as the params
 * and then use that params to read the content
 * it should auto-generate as MDX is now compiled with next.js
 */
