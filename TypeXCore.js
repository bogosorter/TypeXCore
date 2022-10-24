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
 * field, as well as a speed indicator. `settings` have the
 * following structure:
 * 
 * ```js
 * const settings = {
 *    language: {
 *       value: 'english',
 *    },
 *    ...
 * }
 * ```
 * 
 * Furthermore, the component assumes that some CSS variables are defined, such
 * as `--bg-color`, `--color`, `--color-07`, `--color-05`, `--color-02`,
 * `--color-01`. These are used to style the component.
 * 
 * `settingsButton` is an optional property (only used in the website). It
 * should be a function that returns a button to open the settings menu.
 */
export default function TypeXCore({ settings, settingsButton }) {

    // The words the user has to type
    const [words, setWords]  = useState(getWords(settings, 10));
    // The words that will come next
    const [nextWords, setNextWords] = useState(getWords(settings, 10));
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
            setWords(nextWords);
            setNextWords(getWords(settings, 10));
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
        setWords(nextWords);
        setNextWords(getWords(settings, 10));
        setWIndex(0);
        setCount(0);
    }

    // Setting changes should reset the whole component
    useMemo(reset, [settings]);
    
    const currentWordState = words[wIndex].state == 'warning'? 'warning' : 'current';

    return (
        <div id='typex-core'>
            <div className='typex-words'>
                {words.map((word, index) => (
                    <Word
                        key={index}
                        word={word.word}
                        state={index == wIndex? currentWordState : word.state}
                    />
                ))}
            </div>
            <div className='typex-words'>
                {nextWords.map((word, index) => (
                    <Word
                        key={index}
                        word={word.word}
                        state={word.state}
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
                {useMemo(() => <SpeedIndicator count={count} timer={timer} />, [wIndex])}
                <Button onClick={state == 'running'? pause : reset}>
                    {state == 'running'? <Pause /> : <Restart />}
                </Button>
                {settingsButton && settingsButton()}
            </div>
        </div>
    )
}