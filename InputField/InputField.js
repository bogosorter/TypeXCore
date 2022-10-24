import { useState, useEffect, useRef } from 'react';
import './inputfield.css';

/**
 * Component used to display the input field. It will inform the parent
 * component whether the user has typed a word correctly, incorrectly or is
 * still typing it.
 */
export default function InputField({ word, correct, incorrect, ok, warning, state, start }) {

    // The value of the input field
    const [value, setValue] = useState('');

    // The input field
    const input = useRef(null);

    // Focus the input field
    useEffect(() => {
        input.current.focus();
    }, [word]);

    function onKeyDown(e) {
        // Space and enter trigger submission
        if (e.key == ' ' || e.key == 'Enter') {
            e.preventDefault();
            setValue('');
            
            if (value == word) {
                correct();
            } else {
                incorrect();
            }
        }
    }

    function onChange(e) {

        if (state != 'running') start();

        // Update the value
        setValue(e.target.value);

        // Check if the word is being typed correctly
        if (word.startsWith(e.target.value)) ok();
        else warning();
    }

    return (
        <input
            id='typex-input'
            ref={input}
            value={value}
            onKeyDown={onKeyDown}
            onChange={onChange}
            placeholder='Type here...'
            autoComplete='off'
        />
    )
}