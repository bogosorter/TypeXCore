/**
 * Class that helps to keep track of time.
 */
export default class Timer {
    constructor() {
        this.state = 'stopped';
        this.time = 0;
        this.startTime = 0;
    }

    /**
     * Starts the timer. If the timer has already stared, nothing happens.
     */
    start() {
        if (this.state == 'running') return;
        this.state = 'running';
        this.startTime = Date.now();
    }

    /**
     * Pauses the timer.
     */
    pause() {
        if (this.state == 'paused') return;
        this.state = 'paused';
        this.time += Date.now() - this.startTime;
    }

    /**
     * Resets the timer.
     */
    reset() {
        this.state = 'stopped';
        this.time = 0;
        this.startTime = 0;
    }

    /**
     * Returns the time elapsed since the timer was started
     */
    get() {
        if (this.state == 'running') {
            return (this.time + Date.now() - this.startTime) / 1000;
        } else {
            return this.time / 1000;
        }
    }

    /**
     * Returns the state of the timer. It can be one of the following:
     * 
     * - `running`: the timer is running
     * - `paused`: the timer is paused
     * - `stopped`: the timer is stopped
     */
    state() {
        return this.state;
    }
}