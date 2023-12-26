import { useEffect, useState } from 'react';
import * as utils from './../../library/utils/typewrite';
import styles from './../styles.module.css';
import { FrontPageGeneratorItem } from '@/app/constants';

/**
 *
 * This component creates an effect, like a type writer. This component won't be used in the build or production.
 * @returns
 */
const TypeWriter = ({ wordGenerator }: { wordGenerator: FrontPageGeneratorItem[] }) => {
   const [state, setState] = useState({
      sentenceIndex: 0,
      charIndex: 0,
      sentences: wordGenerator.map(() => ''),
      isProcessing: wordGenerator.map(() => false),
      isFinished: false,
      initialDelayDone: false,
   });

   useEffect(() => {
      const initialDelayTimer = setTimeout(() => {
         setState((prevState) => ({
            ...prevState,
            initialDelayDone: true,
         }));
      }, utils.FIRST_INIT_DURATION);

      return () => clearTimeout(initialDelayTimer);
   }, []);

   useEffect(() => {
      if (!state.initialDelayDone || state.isFinished) return;

      const chars = utils.splitWordsIntoChars(wordGenerator, state.sentenceIndex);

      if (state.charIndex < chars.length) {
         const timer = setTimeout(() => {
            setState((prevState) => ({
               ...prevState,
               sentences: utils.getNextSentences(
                  prevState.sentences,
                  state.sentenceIndex,
                  chars,
                  state.charIndex
               ),
               isProcessing: utils.getNextProcessingStates(
                  prevState.isProcessing,
                  state.sentenceIndex,
                  true
               ),
               charIndex: prevState.charIndex + 1,
            }));
         }, utils.EACH_LETTER_DURATION);

         return () => clearTimeout(timer);
      } else if (state.sentenceIndex < wordGenerator.length - 1) {
         const nextSentenceTimer = setTimeout(() => {
            setState((prevState) => ({
               ...prevState,
               sentenceIndex: prevState.sentenceIndex + 1,
               charIndex: 0,
               isProcessing: utils.getNextProcessingStates(
                  prevState.isProcessing,
                  state.sentenceIndex,
                  false
               ),
            }));
         }, wordGenerator[state.sentenceIndex].duration);

         return () => clearTimeout(nextSentenceTimer);
      } else {
         const processTimer = setTimeout(() => {
            // clearing away any of isProcessing and toggle isFinished
            setState((prevState) => ({
               ...prevState,
               isProcessing: utils.toggleAllProcessingState(prevState.isProcessing),
               isFinished: true,
            }));
         }, 400);

         return () => clearTimeout(processTimer);
      }
   }, [state, wordGenerator]);

   return (
      // maybe this should be a separate component?
      <div className='text-white overflow-hidden'>
         {!state.initialDelayDone && (
            <span
               className={`font-mono text-4xl ${
                  !state.initialDelayDone ? styles.typingText : styles.typingDone
               }`}
            ></span>
         )}
         {state.sentences.map((sentence, index) =>
            utils.renderElementByTag(
               wordGenerator[index].tags,
               sentence,
               `font-mono text-4xl  ${
                  state.isProcessing[index] ? styles.typingText : styles.typingDone
               }`
            )
         )}
      </div>
   );
};

export default TypeWriter;
