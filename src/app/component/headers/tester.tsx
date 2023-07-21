import React, { useState, useEffect } from 'react';
import { FrontPageGenerator, FrontPageGeneratorItem } from '../../../../constants';
import styles from './../styles.module.css';

// TODO: let's refactor this code
const Tester = ({ wordGenerator }: { wordGenerator: FrontPageGeneratorItem[] }) => {
   const [state, setState] = useState({
      sentenceIndex: 0,
      wordIndex: 0,
      sentences: wordGenerator.map(() => ''),
      isProcessing: wordGenerator.map(() => false),
      initialDelayDone: false,
   });

   useEffect(() => {
      const timer = setTimeout(() => {
         setState((prevState) => ({
            ...prevState,
            initialDelayDone: true,
         }));
      }, 500);

      return () => clearTimeout(timer);
   }, []);

   useEffect(() => {
      const currentGenerator = wordGenerator[state.sentenceIndex];
      const words = currentGenerator.words.join(' ').split(' ');
      if (state.initialDelayDone) {
         if (state.wordIndex < words.length) {
            const timer = setTimeout(() => {
               setState((prevState) => ({
                  ...prevState,
                  sentences: prevState.sentences.map((sentence, index) =>
                     index === state.sentenceIndex
                        ? sentence + ' ' + words[state.wordIndex]
                        : sentence
                  ),
                  isProcessing: prevState.isProcessing.map((processing, index) =>
                     index === state.sentenceIndex ? true : processing
                  ),
                  wordIndex: prevState.wordIndex + 1,
               }));
            }, currentGenerator.duration);

            return () => clearTimeout(timer);
         } else if (state.sentenceIndex < wordGenerator.length - 1) {
            setState((prevState) => ({
               ...prevState,
               sentenceIndex: prevState.sentenceIndex + 1,
               wordIndex: 0,
               isProcessing: prevState.isProcessing.map(
                  (processing, index) => index === state.sentenceIndex && false
               ),
            }));
         } else {
            const processTimer = setTimeout(() => {
               // clear away any of isProcessing
               setState((prevState) => ({
                  ...prevState,
                  isProcessing: prevState.isProcessing.map(() => false),
               }));
            }, 1500);

            return () => clearTimeout(processTimer);
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [state]);

   const renderElementByTag = (tags: string, content: string, className: string) => {
      switch (tags) {
         case 'h1':
            return <h1 className={className}>{content}</h1>;
         case 'h2':
            return <h2 className={className}>{content}</h2>;
         case 'h3':
            return <h3 className={className}>{content}</h3>;
         // add any other cases as needed
         default:
            return <span className={className}>{content}</span>;
      }
   };

   return (
      <div className='text-white overflow-hidden'>
         {!state.initialDelayDone && (
            <span
               className={`font-mono text-4xl ${
                  !state.initialDelayDone ? styles.typingText : styles.typingDone
               }`}
            ></span>
         )}
         {state.sentences.map((sentence, index) =>
            renderElementByTag(
               wordGenerator[index].tags,
               sentence,
               `font-mono text-2xl transition-all duration-75  ${
                  state.isProcessing[index] ? styles.typingText : styles.typingDone
               }`
            )
         )}
      </div>
   );
};

export default Tester;

// const [finished, setFinished] = useState(wordGenerator.map(() => false));
// const [index, setIndex] = useState(wordGenerator.map(() => 0));
// const [sentence, setSentence] = useState(wordGenerator.map(() => ''));

// const createNextSentence = (
//    finished: boolean,
//    arrayIndex: number,
//    wordIndex: number,
//    generator: Generator
// ) => {
//    const words = generator.words;
//    return new Promise<void>((resolve, reject) => {
//       if (finished) {
//          if (wordIndex < words.length) {
//             const word = words[wordIndex];
//             setSentence((prevSentence) => {
//                const nextSentence = [...prevSentence];
//                nextSentence[arrayIndex] =
//                   prevSentence +
//                   (prevSentence.length <= 0 ? '' : word.length === 1 ? '' : ' ') +
//                   word;
//                return nextSentence;
//             });
//             const timer = setTimeout(() => {
//                if (wordIndex < words.length) {
//                   setIndex((prevIndex) => {
//                      const nextIndex = [...prevIndex];
//                      nextIndex[arrayIndex] = nextIndex[arrayIndex] + 1;
//                      return nextIndex;
//                   });
//                }
//             }, generator.duration);

//             clearTimeout(timer);
//             resolve(
//                setFinished((prevFinished) => {
//                   const newFinished = [...prevFinished];
//                   newFinished[arrayIndex] = true;
//                   return newFinished;
//                })
//             );
//          }
//       } else {
//          reject(); // error message here
//       }
//    });
// };

// useEffect(() => {
//    Object.values(wordGenerator).map(async (generator, idx) => {
//       const wordIndex = index[idx];
//       const isFinished = finished[idx];
//       await createNextSentence(isFinished, idx, wordIndex, generator);
//    });

//    // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [index]);
