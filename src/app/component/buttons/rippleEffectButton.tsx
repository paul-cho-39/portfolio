import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';

interface RippleEffectButtonProps {
   name: string;
   onClick: () => void;
   createRippleOnClick?: boolean;
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

type RippleParams = {
   event?: React.MouseEvent<HTMLButtonElement>;
   mouseX?: number;
   mouseY?: number;
};

const DEFAULT_SIZE = 50;
const DEFAULT_TIME = 800;
const DEFAULT_RIPPLE_INTERVAL = 500;

/**
 * Sets ripple effect with customizable color and size when hovered over.
 * The effect will persist as long as the user hovers over the button.
 * The button has an option to create ripple effect when clicked
 * @param {object} props
 * @param {string} props.name - The text to display on the button.
 * @param {Function} props.onClick - Function to call when the button is clicked.
 * @param {boolean} [props.createRippleOnClick] - Whether to create a ripple effect on click.
 * @param {number} [props.rippleSize=DEFAULT_SIZE] 
 * @param {string} [props.rippleColor='blue'] 
 * @param {number} [props.rippleTime=DEFAULT_TIME] - Duration of the ripple effect.
 * @param {number} [props.rippleInterval=DEFAULT_RIPPLE_INTERVAL] - Interval between ripple effects when hovered.
 * @param {string} [props.className]

 */
const RippleEffectButton = ({
   name,
   onClick,
   createRippleOnClick,
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

   //    helper function
   const getBtnAttr = (button: HTMLButtonElement) => {
      const rect = button.getBoundingClientRect();
      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;

      return { rect, diameter, radius };
   };

   useEffect(() => {
      let interval: NodeJS.Timer;
      if (mousePosition.x !== 0 && mousePosition.y !== 0) {
         interval = setInterval(() => {
            // as long as the mouse position is set newRipple should not return null
            const newRipple = createRipple(
               buttonRef.current,
               mousePosition.x,
               mousePosition.y
            ) as RippleEffect;

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

   const createRipple = (button: HTMLButtonElement | null, mouseX: number, mouseY: number) => {
      //   const button = buttonRef.current;
      if (button) {
         const { rect, diameter } = getBtnAttr(button);
         //  const pos = getRipplePos(params, rect);
         //  if 'rippleSize' is assigned and the value is more than the diameter of the button
         //  it sets the maximum size to the diameter
         const size = Math.min(diameter, rippleSize);

         const x = mouseX - rect.left - size / 2;
         const y = mouseY - rect.top - size / 2;

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

   const handlePress = (event: React.MouseEvent<HTMLButtonElement>) => {
      // since it will leave the mouse(?)
      if (createRippleOnClick) {
         const button = event.currentTarget;
         const newRipple = createRipple(button, event.clientX, event.clientY) as RippleEffect;

         setRipples((prev) => [...prev, newRipple]);

         // cleanup ripple after animation
         setTimeout(() => {
            setRipples((prev) => prev.filter((ripple) => ripple.key !== newRipple.key));
         }, 400);
      }

      // cleaning up ripple effect
      handleMouseLeave();

      onClick();
   };

   return (
      <button
         ref={buttonRef}
         onClick={handlePress}
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
