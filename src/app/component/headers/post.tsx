import { GrayMatterContent } from '@/app/library/mdx/getMarkdownData';
import ROUTES from '@/app/utils/routes';
import Link from 'next/link';

interface PostsProps {
   posts: GrayMatterContent[];
   className?: string;
}

const DisplayOtherPosts = ({ posts }: PostsProps) => {
   return (
      <div className='mt-8'>
         <h2 className='text-xl font-bold mb-4'>Other Projects</h2>
         <ul className='space-y-2 list-disc list-inside marker:text-black dark:marker:text-white'>
            {posts.map((post, index) => (
               <li key={index}>
                  {/* <div className='flex-shrink'> */}
                  <Link
                     className='blue-highlight text-lg cursor-pointer'
                     href={ROUTES.PROJECTS.NEXT_PROJECT(post?.slug)}
                  >
                     {post.contents?.data.title}
                  </Link>
                  {/* </div> */}
                  <span>
                     <span className='after:content-[" "]'>
                        {''} | {''}
                     </span>
                     <span>{post.contents?.data.section}</span>
                  </span>
               </li>
            ))}
         </ul>
      </div>
   );
};

export default DisplayOtherPosts;
