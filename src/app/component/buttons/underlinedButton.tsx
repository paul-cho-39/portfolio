import styles from './styles.module.css';

interface UnderlinedLinkProps {
   title: string;
   href: string;
   onClick?: (value: boolean) => void;
   children?: React.ReactNode;
}

const UnderlinedLink = ({ title, href, onClick, children }: UnderlinedLinkProps) => {
   // TODO: should it be "a" tag or "Link" tag?

   return (
      // <ul className='w-full h-12 transform -translate-x-1/2 -translate-y-1/2 text-center list-none m-0 p-0'>
      <li className='relative inline-block px-4 text-white'>
         <a
            href={href}
            className='text-white no-underline inline-block p-4 hover:after:w-full after:underline-blur after:animate-underline hover:after:left-0 '
         >
            {title}
            {children}
         </a>
      </li>
      // </ul>
   );
};

export default UnderlinedLink;
