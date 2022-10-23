import Word from './Word/Word';
import InputField from './InputField/InputField';
import SpeedIndicator from './SpeedIndicator/SpeedIndicator';
import Button from './Button/Button';
import { Pause, Restart } from './Icons/Icons';

import { useState, useMemo } from 'react';
import getWords from './utilities/utilities';
import Timer from './Timer/Timer';
import './typexcore.css';

/**
 * This is the main component. It will display the text to type and the input
 * field, as well as a speed indicator. `settings` and `words` should have the
 * following structure:
 * 
 * ```js
 * const settings = {
 *    language: {
 *       value: 'en'
 *    },
 *    ...
 * }
 *  
 * const words = {
 *    en: [word1, word2, ...],
 *    fr: [mot1, mot2, ...],
 *    ...
 * }
 * ```
 * 
 * Furthermore, the component assumes that some CSS variables are defined, such
 * as `--bg-color`, `--color`, `--color-07`, `--color-05`, `--color-02`,
 * `--color-01`. These are used to style the component.
 */
export default function TypeXCore({ settings, words: w }) {

    // The words the user has to type
    const [words, setWords]  = useState(getWords(settings, w, 10));
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
            setWords(getWords(10));
        } else {
            setWIndex(wIndex + 1);
        }
    }
    // Word was typed correctly
    function correct() {
        // Spaces should be counted
        setCount(count + 1 + words[wIndex].word.length);
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
        setWords(getWords(settings, w, 10));
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
            <div id='typex-io-container'>
                <InputField
                    word={words[wIndex].word}
                    correct={correct}
                    incorrect={incorrect}
                    ok={ok}
                    warning={warning}
                    state={state}
                    start={start}
                />
                <Button onClick={state == 'running'? pause : reset}>
                    {state == 'running'? <Pause /> : <Restart />}
                </Button>
                {useMemo(() => <SpeedIndicator count={count} timer={timer} />, [wIndex])}
            </div>
        </div>
    )
}