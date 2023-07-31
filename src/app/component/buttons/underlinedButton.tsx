import styles from './styles.module.css';

interface UnderlinedLinkProps {
   title: string;
   onClick?: (value: boolean) => void;
}

const UnderlinedLink = ({ title, onClick }: UnderlinedLinkProps) => {
   // TODO: should it be "a" tag or "Link" tag?
   return (
      // <ul className='w-full h-12 transform -translate-x-1/2 -translate-y-1/2 text-center list-none m-0 p-0'>
      <li className='relative inline-block px-4 text-white'>
         <a
            href='#'
            className='text-white no-underline inline-block p-4 hover:after:w-full after:animate-underline hover:after:left-0 '
         >
            {title}
         </a>
      </li>
      // </ul>
   );
};

export default UnderlinedLink;
