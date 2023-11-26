import { Html, useProgress } from '@react-three/drei';

// https://codesandbox.io/s/nn2m7?file=/src/App.js

const CanvasLoader = () => {
   const { progress, errors } = useProgress();

   if (errors.length > 1) {
      // if error just load the page
   }

   // loader css

   return <Html></Html>;
};
