'use client';
// import { Title } from '../component/headers/title';

import AboutMe from './../posts/about/title.mdx';
import { BlogLayout, TitleContainer } from '../component/layouts/_pages';

export default function About() {
   return (
      <div className=''>
         <TitleContainer>
            {/* <Title title='Biography' /> */}
            <AboutMe />
         </TitleContainer>
         <BlogLayout>
            <p>Hello world my name is Paul</p>
            <p>
               This should be a blog world my name is Paul. This should be a blog world my name is
               Paul. This should be a blog world my name is Paul
            </p>
            <p>Hello world my name is Paul</p>
            <p>Hello world my name is Paul</p>
         </BlogLayout>
      </div>
   );
}
