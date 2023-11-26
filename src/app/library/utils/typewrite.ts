import React from 'react';
import { FrontPageGeneratorItem } from '@/constants';

export const renderElementByTag = (tag: string, content: string, className: string | undefined) => {
   return React.createElement(tag, { className }, content);
};

export const splitWordsIntoChars = (generator: FrontPageGeneratorItem[], idx: number) => {
   const currentGeneratorWords = generator[idx];
   return currentGeneratorWords.words.join(' ').split('');
};

export function getNextSentences(
   sentences: string[],
   sentenceIndex: number,
   char: string[],
   charIndex: number
) {
   return sentences.map((sentence, index) =>
      index === sentenceIndex ? sentence + char[charIndex] : sentence
   );
}

export function getNextProcessingStates(
   isProcessing: boolean[],
   sentenceIndex: number,
   state: boolean
) {
   return isProcessing.map((processing, index) => (index === sentenceIndex ? state : processing));
}

export function toggleAllProcessingState(isProcessing: boolean[]) {
   return isProcessing.map(() => false);
}

export const FIRST_INIT_DURATION = 500;
export const EACH_LETTER_DURATION = 30;
