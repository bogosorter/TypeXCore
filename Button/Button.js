import './button.css';

/**
 * Defines a simple button component. Its properties are `onClick` and `children`.
 */
export default function Button({ onClick, children }) {
    return (
        <button className='typex-button' onClick={onClick}>
            {children}
        </button>
    )
}