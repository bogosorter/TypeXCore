import { useEffect, useRef } from 'react';

import './caret.css';

/**
 * Simulates a caret to be placed in the word that is currently being typed.
 * `ref` is a reference to the div holding the words
 */
export default function Caret({ getCurrentChar }) {

    const caret = useRef(null);
   
    useEffect(() => {
        const currentChar = getCurrentChar();
        caret.current.style.left = currentChar.offsetLeft + 'px';
        caret.current.style.top = currentChar.offsetTop + 'px';
    });

    return (
        <div id='typex-caret' ref={caret}></div>
    )
}