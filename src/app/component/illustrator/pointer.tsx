import useMousePosition from '../../library/hooks/useMousePosition';

interface PointerProps {
   radius: number;
   color: string;
}

const Pointer = ({ radius, color }: PointerProps) => {
   const position = useMousePosition();
   const pointer = radius / 10;

   // CONSIDER: should the pointer position.y be a bit higher?
   const getTranslatePos = (value: number) => {
      const translate = value / 2;
      return {
         x: convertToCssString(position.x - translate),
         y: convertToCssString(position.y - translate),
      };
   };

   const circleTranslate = getTranslatePos(radius);
   const pointerTranslate = getTranslatePos(pointer);

   return (
      <>
         <div
            style={{
               height: convertToCssString(radius),
               width: convertToCssString(radius),
               borderRadius: '50%',
               border: '1px solid white',
               backgroundColor: 'transparent',
               position: 'absolute',
               transform: `translate(${circleTranslate.x}, ${circleTranslate.y})`,
            }}
         />
         <div
            style={{
               height: convertToCssString(pointer),
               width: convertToCssString(pointer),
               borderRadius: '50%',
               border: '1px solid white',
               backgroundColor: 'transparent',
               position: 'absolute',
               transform: `translate(${pointerTranslate.x}, ${pointerTranslate.y})`,
            }}
         />
      </>
   );
};

const convertToCssString = (value: number) => {
   return value.toString() + 'px';
};

export default Pointer;
