import classNames from 'classnames';
import styles from './styles.module.css';

interface UnderlineTextProps {
   title: string;
   className?: string;
   nextWord?: string | false;
}

const UnderlineText = ({ title, className, nextWord = '\u00A0' }: UnderlineTextProps) => {
   return (
      // <ul className='w-full h-12 transform -translate-x-1/2 -translate-y-1/2 text-center list-none m-0 p-0'>
      <div className='relative inline'>
         <span
            className={classNames(
               className,
               'group-hover:after:w-full after:animate-underline group-hover:after:left-0'
            )}
            style={{
               animationDelay: '1s',
            }}
         >
            {title}
            {nextWord !== false && <span>{nextWord}</span>}
         </span>
      </div>
   );
};

export default UnderlineText;
