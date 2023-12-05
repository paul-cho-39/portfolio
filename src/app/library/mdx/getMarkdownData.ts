import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// the types here represent folder names
type FolderParms = 'projects' | 'blogs';

interface MarkdownMetaPros {
   title: string;
   date: number | string | Date;
   slug: string;
}

// const getMarkdownMetaData = (folder: FolderParms) => {
//    const markdown = getMdxMetaData(folder);
//    return markdown.map((file) => {
//       const contents = fs.readFileSync(`posts/${folder}/${file}.mdx`, 'utf8');
//       const result = matter(contents);
//       return {
//          title: result.data.title,
//          date: result.data.date,
//          slug: file.replace('.mdx', ''),
//          // TODO: add the types in @types
//       };
//    });
// };

const getMarkdownMetaData = (folder: FolderParms) => {
   const markdownDirectory = path.join(process.cwd(), `posts/${folder}`);
   let metadata: MarkdownMetaPros[] | [] = [];

   try {
      const files = fs.readdirSync(markdownDirectory);
      const filenames = files.filter((file) => file.endsWith('.mdx'));

      metadata = filenames.map((filename) => {
         const filePath = path.join(markdownDirectory, filename);
         const contents = fs.readFileSync(filePath, 'utf8');
         const result = matter(contents);

         return {
            title: result.data.title as string,
            date: result.data.date as number,
            slug: filename.replace('.mdx', ''),
            // ... other metadata
         };
      });
   } catch (error) {
      console.error('Error reading markdown files:', error);
      // You could also set metadata to null or a specific error flag if needed
   }

   return metadata;
};

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

export { getMarkdownContent };
export default getMarkdownMetaData;
