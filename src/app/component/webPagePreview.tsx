import Link from 'next/link';
import React from 'react';

const WebPagePreview = ({ url }: { url: string }) => {
   return (
      <div className='w-[100px] h-[200px] relative'>
         <iframe
            src={url}
            title='Webpage Preview'
            className='absolute inset-0 h-full w-full overflow-hidden opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out'
            allowTransparency={true}
         ></iframe>
      </div>
   );
};

export default WebPagePreview;

/**
 * rules:
 * show iFrame when it is hidden
 * create CSS where 'hidden' when not hovered and 'active' when hovered
 *  */

/**
 * features:
 * back feature stack: for history -- how to achieve this without using 'client'
 * next project: should be inside the <Link>
 * if 'next' is pressed then it should stack
 * possibly use 'server' and just use the API
 *
 * ideas?:
 * generate ALL slugs
 * if SLUGS ->
 */
