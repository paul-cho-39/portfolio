'use client';

import { useEffect, useState } from 'react';
import styles from './../styles.module.css';

interface FrontCoverParams {
   //    primaryWords: string[];
   //    secondaryWords?: string[];
   //    enableWhitespace?: boolean; // ONLY for letters
   children?: React.ReactNode;
}

const FrontCover = ({
   //    primaryWords,
   //    secondaryWords,
   //    enableWhitespace,
   children,
}: FrontCoverParams) => {
   // WORDS should be de facto array and other arrays that would require different time should be set in a separate array
   // and then use spread to concatenate the array
   const letters = ['W', 'E', 'L', 'C', 'O', 'M', 'E'];
   const words = [...letters, 'to', 'my', 'site', 'this', 'is', 'paul'];

   const [sentence, setSentence] = useState('');
   const [index, setIndex] = useState(0);

   useEffect(() => {
      // const w = getWords();
      if (index < words.length) {
         const word = words[index];
         setSentence(
            (prevSentence) =>
               // enableWhitespace here
               prevSentence + (prevSentence.length <= 0 ? '' : word.length === 1 ? '' : ' ') + word
         );

         // can be used for implementing a function for different words
         const firstTimer = setTimeout(() => {
            if (index < letters.length) {
               setIndex((prevIndex) => prevIndex + 1);
            }
         }, 150);

         const secondTimer = setTimeout(() => {
            if (index >= letters.length && index < words.length) {
               setIndex((prevIndex) => prevIndex + 1);
            }
         }, 100);

         return () => {
            // can run a loop
            clearTimeout(firstTimer);
            clearTimeout(secondTimer);
         };
      }
   }, [index]);

   // possible params -- hideCaretsAfter
   const getStyle = index >= words.length ? styles.typingDone : styles.typingText;

   // so the end product should be mapping over sentences

   return (
      <div className={`text-white overflow-hidden`}>
         <h1 className={`font-mono text-2xl ${getStyle}`}>{sentence}</h1>
      </div>
   );
};

export default FrontCover;

// Object.values(Generator).map((word) =>  )
