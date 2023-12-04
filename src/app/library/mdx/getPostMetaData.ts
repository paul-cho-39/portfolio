import fs from 'fs';
import path from 'path';

// the types here represent folder names
type FolderParms = 'about' | 'projects' | 'blogs';

const getMdxFiles = (folder: FolderParms) => {
   try {
      // constructing the path to the folder
      const folderPath = path.join(__dirname, 'posts', folder);

      const files = fs.readdirSync(folderPath);

      // filter out the .mdx files
      const mdxFiles = files.filter((file) => file.endsWith('.mdx'));

      return mdxFiles;
   } catch (error) {
      console.error('Error reading folder:', error);
      return [];
   }
};

export default getMdxFiles;
