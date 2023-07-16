interface ToggleButtonProps {
   title: string;
   onClick: (value: boolean) => void;
}

const ToggleButton = ({ title, onClick }: ToggleButtonProps) => {
   return (
      <>
         <button aria-label={title} onClick={() => onClick}>
            Toggle
         </button>
      </>
   );
};
