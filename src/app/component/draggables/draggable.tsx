import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import Resize from './resizeable';

// react-draggable does a good job calculating the offset whenever there is bounded position set
// it is lightweight and should have no issue running this

interface DraggableElementProps {
   label?: string;
   children?: React.ReactNode;
}

const DraggableElement = ({ label, children }: DraggableElementProps) => {
   // set bounds for card elements that should not be passing the boundary position

   // resizing rules:
   // 1) if there is no resizing -- absolute, allow components to stack (each should already have its own size)
   // 2) if one of the component is resized (horizontal / vertical ) then move the axis on x/y
   // depending on the scale. If it is resized horizontally, the axis can be moved at "y" and if it is
   // resized vertically then, it can be moved at "x" axis.
   // 3)

   return (
      <Draggable
         axis='both'
         allowAnyClick={false}
         //  position={{ x: 100, y: 100 }} // set position for mobile devices
         defaultPosition={{ x: 100, y: 100 }} // first touched and it has not been touched yet
         // cancel='.no-drag'
         grid={[100, 5]} // how much it jumps from one axis to another
         scale={1}
      >
         {/* cannot have two children just one
          ** this means creating one children which will be cards that will be looped over and apply resizing
          */}
         <div className='h-24 w-24 bg-blue-200 overflow-auto resize'>
            Drag me {label}
            <button className='no-drag mt-4 p-2 bg-white text-blue-500'>Click Me</button>{' '}
            <span className='no-drag'>Just testing</span>
         </div>
         {/* <Resize /> */}
      </Draggable>
   );
};

export default DraggableElement;
