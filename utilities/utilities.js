import w from './words';

/**
 * Returns an array of characters of length `n` characters, according to the
 * current settings. These characters should make up coherent words.
 */
export default function getText(settings, n) {
    const words = w[settings.language.value];
    let characters = [];
    
    while (characters.length < n) {
        const word = words[Math.floor(Math.random() * words.length)];
        const chars = word.split('');
        characters = characters.concat(chars.map(c => ({ char: c, state: 'default' })));
        characters.push({char: ' ', state: 'space'});
    }

    return characters;
}