import './char.css';

/**
 * Component used to display a word. It will be displayed in a different
 * color depending on the state of the word. The state can be one of the
 * following:
 * 
 * - correct: the word has been typed correctly
 * - incorrect: the word has been typed incorrectly
 * - warning: the word has been typed incorrectly, but the user is still typing it
 * - current: the word is currently being typed
 * - default: the word has not been typed yet
 */
export default function Char({ word, state }) {
    return (
        <div className={`typex-char ${state}`}>{word}</div>
    )
}