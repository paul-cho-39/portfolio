import classNames from '@/app/library/helper';
import { useRef, useState, useCallback, useEffect } from 'react';

type Direction =
   | 'top'
   | 'bottom'
   | 'left'
   | 'right'
   | 'topright'
   | 'bottomright'
   | 'bottomleft'
   | 'topleft';

type Size = { width: number; height: number };

interface ResizeableProps {
   defaultSize: Size;
   minSize: Size;
   maxSize: Size; // will default to defaultSize
   offsetBorderIdentifier?: number;
}

const CardImage = () => {
   const [size, setSize] = useState<Size>({ width: 200, height: 200 });
   const [isEditMode, setEditMode] = useState(false);
   const [displayCursor, setDisplayCursor] = useState('default');
   const boxRef = useRef<HTMLDivElement | null>(null);

   const handleMouseDown = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
         if (!isEditMode || !boxRef.current) return;

         const { clientX: startX, clientY: startY } = e;
         const { width: startWidth, height: startHeight } = size;

         const handleMouseMove = (e: MouseEvent) => {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            const newWidth = Math.max(0, startWidth + dx);
            const newHeight = Math.max(0, startHeight + dy);

            setSize({ width: newWidth, height: newHeight });
         };

         const handleMouseUp = () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
         };

         window.addEventListener('mousemove', handleMouseMove);
         window.addEventListener('mouseup', handleMouseUp);
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [isEditMode]
   );

   //    whenever handling the mouse it will display the stop(?) wtf is this **

   const handleMouseMove = useCallback(
      (e: MouseEvent) => {
         if (!isEditMode || !boxRef.current) return;

         let newCursor = 'auto';

         const buffer = 8;
         const { left, top, width, height } = boxRef.current.getBoundingClientRect();

         if (Math.abs(e.clientX - (left + width)) < buffer || Math.abs(e.clientX - left) < buffer) {
            newCursor = 'col-resize';
         }
         if (Math.abs(e.clientY - (top + height)) < buffer || Math.abs(e.clientY - top) < buffer) {
            newCursor = 'row-resize';
         }

         setDisplayCursor(newCursor);
      },
      [displayCursor, isEditMode]
   );

   useEffect(() => {
      // set boundary for resizing as well
      window.addEventListener('mousemove', handleMouseMove);
      return () => {
         window.removeEventListener('mousemove', handleMouseMove);
      };
   }, [handleMouseMove]);

   return (
      <div
         ref={boxRef}
         className={`relative ${isEditMode ? 'border-2 border-black outline-black' : ''}`}
         style={{
            width: `${size.width}px`,
            height: `${size.height}px`,
            top: '100px',
            cursor: displayCursor,
         }}
         onDoubleClick={() => setEditMode(!isEditMode)}
         onMouseDown={handleMouseDown}
      >
         <div
            className={classNames(
               isEditMode
                  ? 'outline outline-black outline-1 outline-offset-1 opacity-80 '
                  : 'outline-none',
               //    displayCursor ? 'cursor-se-resize' : 'cursor-auto',
               'bg-blue-300 w-full h-full'
            )}
         >
            Resizable Box
         </div>
      </div>
   );
};

export default Resi;

// change classNames where if it is resized then changed the cursor here
