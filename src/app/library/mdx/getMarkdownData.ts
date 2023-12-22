import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogContainerProps } from '../@types';

// the types here represent folder names
type FolderParms = 'projects' | 'blogs' | 'about';

interface MarkdownMetaProps extends BlogContainerProps {
   slug: string;
}

const getMarkdownMetaData = (folder: FolderParms) => {
   const markdownDirectory = path.join(process.cwd(), `posts/${folder}`);

   // if error it returns an empty array
   let metadata: MarkdownMetaProps[] | [] = [];

   try {
      const files = fs.readdirSync(markdownDirectory);
      const filenames = files.filter((file) => file.endsWith('.mdx'));

      // returns MarkdownMetaProps
      metadata = filenames.map((filename) => {
         const filePath = path.join(markdownDirectory, filename);
         const contents = fs.readFileSync(filePath, 'utf8');
         const result = matter(contents);

         // create metadata for each .mdx file inside the file
         return {
            title: result.data.title as string,
            date: result.data.date as string,
            totalReadingTime: result.data.totalReadingTime,
            keywords: result.data.keywords,
            slug: filename.replace('.mdx', ''),
         };
      });
   } catch (error) {
      console.error('Error reading markdown files:', error);
   }

   return metadata;
};

// The idea here is similar as 'getMarkdownMetaData' and except it returns the whole content
// instead of meta data
const getMarkdownContent = (folder: FolderParms, slug: string) => {
   try {
      const contentPath = `${folder}/${slug}.mdx`;
      const file = path.join(process.cwd(), 'posts', contentPath);
      const content = fs.readFileSync(file, 'utf8');

      const contentResult = matter(content);

      return contentResult;
   } catch (err) {
      console.error('Error reading folder:', err);
      return null;
   }
};

// if blogs are added to the mix combine the slugs into an array
// then make sure the list is correct
function getNextAndPrevMdx(currentSlug: string, allSlugs: string[]) {
   const totalSlugs = allSlugs.length - 1;
   const currentIndex = allSlugs.indexOf(currentSlug);

   const nextSlug = currentIndex !== totalSlugs ? allSlugs[currentIndex + 1] : allSlugs[0];
   const prevSlug = currentIndex > 0 ? allSlugs[currentIndex - 1] : allSlugs[totalSlugs];

   return { nextSlug, prevSlug };
}

// TODO:
// if projects/posts get too large then write another function to filter that out
function getAllMdxNotCurrent(currentSlug: string, allSlugs: string[]) {
   const restProjects = allSlugs.filter((slug) => slug !== currentSlug);
   return restProjects;
}

export { getMarkdownContent, getNextAndPrevMdx, getAllMdxNotCurrent };
export default getMarkdownMetaData;
