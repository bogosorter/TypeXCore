import Char from './Char/Char';
import SpeedIndicator from './SpeedIndicator/SpeedIndicator';
import Button from './Button/Button';
import { Pause, Restart } from './Icons/Icons';
import Caret from './Caret/Caret';

import { useState, useMemo, useRef, useEffect } from 'react';
import getText from './utilities/utilities';
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
    const [characters, setCharacters] = useState(getText(settings, 150));
    // The index of the current word
    const [cIndex, setCIndex] = useState(0);
    // Wether the input is focused
    const [focused, setFocused] = useState(false);
    // Keep track of time
    const timer = useMemo(() => new Timer(), []);
    // The number of chacters the user has typed so far
    const [count, setCount] = useState(0);
    // The state of the timer
    const [state, setState] = useState('stopped');

    // The input field
    const input = useRef(null);
    // The div that contains the characters
    const container = useRef(null);


    // Load next character
    function next() {
        if (cIndex + 1 == characters.length) {
            setCIndex(0);
            setCharacters(getText(settings, 150));
        } else {
            setCIndex(cIndex + 1);
        }
    }
    // Character was typed correctly
    function correct() {
        setCount(count + 1);
        const newCharacters = [...characters];
        if (newCharacters[cIndex].char != ' ') newCharacters[cIndex].state = 'correct';
        setCharacters(newCharacters);
        next();
    }
    // Character was typed incorrectly
    function incorrect() {
        const newWords = [...characters];
        newWords[cIndex].state = 'incorrect';
        setCharacters(newWords);
        next();
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
        setCharacters(getText(settings, 150));
        setCIndex(0);
        setCount(0);
    }
    // Setting changes should reset the whole component
    useMemo(reset, [settings]);

    // Delete a single character
    function deleteChar() {
        const newCharacters = [...characters];
        newCharacters[cIndex].state = 'default';
        newCharacters[cIndex - 1].state = 'current';
        setCharacters(newCharacters);
        setCIndex(cIndex - 1);
    }
    // Delete a whole word
    function deleteWord() {
        const newCharacters = [...characters];
        // Delete all characters until the last space
        for (let i = cIndex; i >= 0; i--) {
            // The last condition ensures that the last word is deleted even if
            // the user just typed a space
            if (i == 0 || (newCharacters[i - 1].char == ' ' && cIndex - 1 != i - 1)) {
                newCharacters[i].state = 'current';
                setCIndex(i);
                break;
            }
            newCharacters[i].state = 'default';
        }
        setCharacters(newCharacters);
    }
    // Skip a word
    function skipWord() {
        const newCharacters = [...characters];
        for (let i = cIndex; i < newCharacters.length; i++) {
            if (newCharacters[i - 1].char == ' ') {
                newCharacters[i].state = 'current';

                setCIndex(i);
                break;
            }
            newCharacters[i].state = 'incorrect';
        }
    }

    function onKeyDown(e) {
        if (e.key == 'Backspace' && e.ctrlKey) {
            e.preventDefault();
            deleteWord();
        } else if (e.key == 'Backspace') {
            e.preventDefault();
            deleteChar();
        } else if (e.key == ' ' && characters[cIndex].char != ' ') {
            e.preventDefault();
            skipWord();
        }
    }

    function onChange(e) {
        if (e.target.value == characters[cIndex].char) {
            correct();
        } else {
            incorrect();
        }
        start();
    }

    function getCurrentCharElement() {
        let offset = cIndex;
        for (const child of container.current.children) {
            if (child.children.length - 1 < offset) {
                offset -= child.children.length;
            } else return child.children[offset];
        }
    }

    useEffect(() => {
        // If current char's offset top is not zero, scroll the container
        if (getCurrentCharElement().offsetTop != 0) {
            let newCharacters = [...characters];
            newCharacters.splice(0, cIndex);
            newCharacters = newCharacters.concat(getText(settings, cIndex));
            setCharacters(newCharacters);
            setCIndex(0);
        }
        
        if (focused) {
            input.current.focus();
        }
    })

    const words = [];
    let currentWord = [];
    for (let i = 0; i < characters.length; i++) {
        if (characters[i].char == ' ') {
            currentWord.push(characters[i]);
            words.push(
                <span key={i} className='word-container'>
                    {currentWord.map((char, index) => (
                        <Char
                            key={index}
                            word={char.char}
                            state={char.state}
                        />
                    ))}
                </span>
            );
            currentWord = [];
        } else {
            currentWord.push(characters[i]);
        }
    }

    return (
        <div id='typex-core'>
            <div onClick={() => setFocused(true)}>
                <div className={'typex-chars' + (focused? ' focused' : '')} ref={container}>
                    {words}
                    <Caret getCurrentChar={getCurrentCharElement} />                  
                </div>
            </div>
            <input id='typex-input' ref={input} type='text' autoComplete='off' autoCapitalize='off' value={''} onChange={onChange} onBlur={() => setFocused(false)} onKeyDown={onKeyDown}/>
            <div id='typex-io-container'>
                {useMemo(() => <SpeedIndicator count={count} timer={timer} />, [cIndex])}
                <Button onClick={state == 'running'? pause : reset}>
                    {state == 'running'? <Pause /> : <Restart />}
                </Button>
                {settingsButton && settingsButton()}
            </div>
        </div>
    )
}