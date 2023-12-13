import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';

interface RippleEffectButtonProps {
   name: string;
   onClick: () => void;
   rippleSize?: number;
   rippleColor?: React.CSSProperties['backgroundColor'];
   rippleTime?: number;
   rippleInterval?: number;
   className?: string;
}

type RippleEffect = {
   key: string;
   style: React.CSSProperties;
};

const DEFAULT_SIZE = 50;
const DEFAULT_TIME = 800;
const DEFAULT_RIPPLE_INTERVAL = 500;
const OFFSET_BY = 40;

/**
 * Sets ripple effect with customizable color and size when hovered over.
 * The effect will persist as long as the user hovers over the button.
 * @param {object} {name, onClick, rippleSize, rippleColor, rippleTime, rippleInterval, className}
 * @returns JSX.Element
 */
const RippleEffectButton = ({
   name,
   onClick,
   rippleSize = DEFAULT_SIZE,
   rippleColor = 'blue',
   rippleTime,
   rippleInterval,
   className,
}: RippleEffectButtonProps) => {
   const [ripples, setRipples] = useState<RippleEffect[]>([]);
   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

   const buttonRef = useRef<HTMLButtonElement>(null);
   const counterRef = useRef(0);

   useEffect(() => {
      let interval: NodeJS.Timer;
      if (mousePosition.x !== 0 && mousePosition.y !== 0) {
         interval = setInterval(() => {
            // as long as the mouse position is set newRipple should not return null
            const newRipple = createRipple(mousePosition.x, mousePosition.y) as RippleEffect;
            setRipples((prev) => [...prev, newRipple]);

            setTimeout(() => {
               setRipples((prev) => prev.filter((ripple) => ripple.key !== newRipple.key));
            }, rippleTime || DEFAULT_TIME);
         }, rippleInterval || DEFAULT_RIPPLE_INTERVAL);
      }

      return () => {
         if (interval) {
            clearInterval(interval);
         }
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [mousePosition, ripples]);

   const createRipple = (mouseX: number, mouseY: number) => {
      const button = buttonRef.current;
      if (button) {
         const rect = buttonRef.current?.getBoundingClientRect();

         const x = mouseX - rect.left;
         const y = mouseY - rect.top;
         //  if 'rippleSize' is assigned and if over minit sets the maximum size to either height/width
         const maxSize = Math.max(button.clientHeight, button.clientWidth);
         const size = Math.min(maxSize, rippleSize);
         const offset = (size - OFFSET_BY) / 2;

         return {
            key: `${Date.now()}-${counterRef.current++}`,
            style: {
               top: `${y}px`,
               left: `${x}px`,
               height: `${size}px`,
               width: `${size}px`,
               transform: 'scale(0) translate(-50%, -50%)',
               borderRadius: '50%',
               backgroundColor: rippleColor,
               animation: 'ripple 1s linear forwards',
            },
         };
      }
      return null;
   };

   const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      setMousePosition({ x: mouseX, y: mouseY });
   };

   const handleMouseLeave = () => {
      setMousePosition({ x: 0, y: 0 });
   };

   return (
      <button
         ref={buttonRef}
         onClick={onClick}
         onMouseEnter={handleMouseEnter}
         onMouseLeave={handleMouseLeave}
         className={classNames(
            'relative overflow-hidden font-semibold py-2 px-4 rounded-lg text-center transition-all duration-300 ease-in-out shadow-md hover:shadow-2xl',
            className
         )}
      >
         {ripples.map((ripple) => (
            <span
               aria-disabled='true'
               key={ripple.key}
               className='ripple absolute top-0 left-0 w-full h-full'
               style={ripple.style}
            />
         ))}
         {name}
      </button>
   );
};

export default RippleEffectButton;
