import Link from 'next/link';

interface CardButtonProps {
   title: string;
}

export const CardButton = ({ title }: CardButtonProps) => {
   return <button>
    <Link href={"/"}>{title}</Link>
    </button>;
};

export const CardSmall = () => {
    return (
        
    )
}