import './button.css';

/**
 * A simple button component.
 */
export default function Button({ onClick, children }) {
    return (
        <button className='typex-button' onClick={onClick}>
            {children}
        </button>
    )
}