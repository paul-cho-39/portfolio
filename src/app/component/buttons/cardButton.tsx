interface CardButtonProps {
   title: string;
}

export const CardButton = ({ title }: CardButtonProps) => {
   return <button>{title}</button>;
};
