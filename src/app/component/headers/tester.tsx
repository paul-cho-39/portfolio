import React, { useState, useEffect } from 'react';
import { FrontPageGenerator, FrontPageGeneratorItem } from '../../../../constants';
import styles from './../styles.module.css';

const Tester = ({ wordGenerator }: { wordGenerator: FrontPageGeneratorItem[] }) => {
   const [state, setState] = useState({
      sentenceIndex: 0,
      wordIndex: 0,
      sentences: wordGenerator.map(() => ''),
      isProcessing: wordGenerator.map(() => false),
      isFinished: wordGenerator.map(() => false),
   });

   useEffect(() => {
      const currentGenerator = wordGenerator[state.sentenceIndex];
      const words = currentGenerator.words.join(' ').split(' ');

      if (state.wordIndex < words.length) {
         const timer = setTimeout(() => {
            setState((prevState) => ({
               ...prevState,
               sentences: prevState.sentences.map((sentence, index) =>
                  index === state.sentenceIndex ? sentence + ' ' + words[state.wordIndex] : sentence
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
            isFinished: prevState.isFinished.map((finish, index) =>
               index === state.sentenceIndex ? true : finish
            ),
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
         }, 400);

         return () => clearTimeout(processTimer);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [state]);

   return (
      <div className='text-white overflow-hidden'>
         {state.sentences.map((sentence, index) => (
            <h1
               key={index}
               className={`font-mono text-2xl transition-all  ${
                  state.isProcessing[index] ? styles.typingText : styles.typingDone
               }`}
            >
               {sentence}
            </h1>
         ))}
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
