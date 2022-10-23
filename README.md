# TypeXCore

TypeXCore is a simple react component to improve typing speed. It will be integrated in other projects such as TypeX and TypeXApp.

## Components

### `<TypeXCore settings={} words={} />`

This is the main component. It will display the text to type and the input field, as well as a speed indicator. `settings` and `words` should have the following structure:

```js
const settings = {
    language: {
        value: 'en'
    }
    ...
}

const words = {
    en: [word1, word2, ...],
    fr: [mot1, mot2, ...],
    ...
}
```

Furthermore, the component assumes that some CSS variables are defined, such as `--bg-color`, `--color`, `--color-07`, `--color-05`, `--color-02`, `--color-01` and `--transition`. These are used to style the component.

### `<Word word={} state={} />`

This component is used to display a word. It will be displayed in a different color depending on the state of the word. The state can be one of the following:

- `correct`: the word has been typed correctly
- `incorrect`: the word has been typed incorrectly
- `warning`: the word has been typed incorrectly, but the user is still typing it
- `current`: the word is currently being typed
- `default`: the word has not been typed yet

### `<SpeedIndicator count={} timer={} />`

This component is used to display the speed of the user. It will be displayed in a different color depending on the speed of the user. The speed is calculated as the number of words typed per minute.

### `<InputField word={} correct={} incorrect={} ok={} warning={} state={} start={start} />`

This component is used to display the input field. It will inform the parent component whether the user has typed a word correctly, incorrectly or is still typing it.

### `<Button onClick={} /> ... </Button>`

A simple button component.

## Helper modules

This component uses the following helper modules:

### Timer

Defines a class that helps to keep track of time. It can be used to calculate the speed of the user. The following functions are exported:

#### `start()`

Starts the timer. If the timer has already stared, nothing happens.

#### `pause()`

Pauses the timer.

#### `reset()`

Resets the timer.

#### `get()`

Returns the time elapsed since the timer was started.

#### `state()`

Returns the state of the timer. It can be one of the following:

- `running`: the timer is running
- `paused`: the timer is paused
- `stopped`: the timer has not been started yet

### Utilities

Exports a function that helps to generate a list of random words.

#### `getWords(settings, words, n)`

Returns an array of `n` random words, according to the current settings.

### Icons

Module that exports some usefull icons. All of them have a property `size` that can be used to set the size of the icon. The following icons are exported:

- `Pause`
- `Restart`