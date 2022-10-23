import Word from './Word/Word';
import InputField from './InputField/InputField';
import SpeedIndicator from './SpeedIndicator/SpeedIndicator';
import Button from './Button/Button';
import { Play, Pause, Restart } from './Icons/Icons';

import { useState, useMemo } from 'react';
import Timer from './Timer/Timer';
import Words from './Words/Words';

/**
 * This is the main component. It will display the text to type and the input
 * field, as well as a speed indicator. Some assumptions are made about the
 * containing environment. For instance, settings and words are stored in
 * `localStorage`, and have the following structure:
 * 
 * ```js
 * const settings = {
 *    language: {
 *       value: 'en'
 *    },
 *    displaySpeed: {
 *        value: true
 *    }
 *    ...
 * }
 *  
 * const words = {
 *    en: [word1, word2, ...],
 *    fr: [mot1, mot2, ...]
 * }
 * ```
 * 
 * Furthermore, the component assumes that some CSS variables are defined, such
 * as `--bg-color`, `--color`, `--color-07`, `--color-05`, `--color-02`,
 * `--color-01`. These are used to style the component.
 */
export default function TypeXCore() {

    // The words the user has to type
    const [words, setWords]  = useState(Words.getWords(10));
    // The index of the current word
    const [wIndex, setWIndex] = useState(0);

    // Keep track of time
    const timer = useMemo(() => new Timer(), []);

    // The number of chacters the user has typed so far
    const [count, setCount] = useState(0);

    const [state, setState] = useState('stopped');

    // Load next word
    function next() {
        if (wIndex + 1 == words.length) {
            setWIndex(0);
            setWords(Words.getWords(10));
        } else {
            setWIndex(wIndex + 1);
        }
    }
    // Word was typed correctly
    function correct() {
        // Spaces should be counted
        setCount(count + 1 + words[wIndex].length);
        const newWords = [...words];
        newWords[wIndex].state = 'correct';
        setWords(newWords);
        next();
    }
    // Word was typed incorrectly
    function incorrect() {
        const newWords = [...words];
        newWords[wIndex].state = 'incorrect';
        setWords(newWords);
        next();
    }
    // Word is being typed correctly
    function ok() {
        const newWords = [...words];
        newWords[wIndex].state = 'current';
        setWords(newWords);
    }
    // Word is being typed incorrectly
    function warning() {
        const newWords = [...words];
        newWords[wIndex].state = 'warning';
        setWords(newWords);
    }

    // Start the timer
    function start() {
        timer.start();
        setState('running');
    }
    // Pause the timer
    function pause() {
        timer.pause();
        setState('paused');
    }
    // Restart the timer
    function reset() {
        timer.reset();
        setState('stopped');
        setWords(Words.getWords(10));
        setWIndex(0);
        setCount(0);
    }
    
    const currentWordState = words[wIndex].state == 'warning'? 'warning' : 'current';

    return (
        <div id='typex-core'>
            <div id='typex-words'>
                {words.map((word, index) => (
                    <Word
                        key={index}
                        word={word.word}
                        state={index == wIndex? currentWordState : word.state}
                    />
                ))}
            </div>
            <InputField
                word={words[wIndex].word}
                correct={correct}
                incorrect={incorrect}
                warning={warning}
                state={state}
            />
            <SpeedIndicator count={count} timer={timer} />
            <div id='typex-buttons'>
                <Button onClick={state == 'running'? pause : start}>
                    {state == 'running'? <Pause /> : <Play />}
                </Button>
                <Button onClick={reset}>
                    <Restart />
                </Button>
            </div>
        </div>
    )
}