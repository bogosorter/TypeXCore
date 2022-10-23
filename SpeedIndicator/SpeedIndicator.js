import './speedindicator.css';

/**
 * Component used to display the speed of the user. It will be displayed
 * in a different color depending on the speed of the user. The speed is
 * calculated as the number of words typed per minute.
 */
export default function SpeedIndicator({ count, timer }) {

    const time = timer.get();
    
    // A word is 5 characters long
    const speed = time == 0? 0 : count / 5 / timer.get() * 60;

    // The color of the speed indicator
    // Blend between blue and green
    const percent = speed / 200;
    const color = `rgba(0, ${(1 - percent) * 255}, ${percent * 255}, 0.3)`

    return (
        <div id='typex-speed' style={{ '--bg-color': color }}>
            {Math.round(speed)} wpm
        </div>
    );
}