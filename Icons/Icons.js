function Play({size = 20}) {
    return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 4L15 10L5 16V4Z" fill="currentColor"/>
        </svg>
    )
}

function Pause({size = 20}) {
    return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 4H7V16H5V4Z" fill="currentColor"/>
            <path d="M13 4H11V16H13V4Z" fill="currentColor"/>
        </svg>
    )
}

function Restart({size = 20}) {
    return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 4V7H10V9H14V12L18 8L14 4Z" fill="currentColor"/>
            <path d="M6 16V13H10V11H6V8L2 12L6 16Z" fill="currentColor"/>
        </svg>
    )
}

export { Play, Pause, Restart };