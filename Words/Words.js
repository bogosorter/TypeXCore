/**
 * Class that helps to get random words.
 */
export default class Words {
    /**
     * Returns an array of `n` random words, according to the current settings.
     */
    static getWords(n) {
        const words = Words.getList();
        const result = [];
        for (let i = 0; i < n; i++) {
            result.push({
                word: words[Math.floor(Math.random() * words.length)],
                state: 'default'
            });
        }
    }

    /**
     * Returns a random word, according to the current settings.
     */
    static getWord() {
        return {
            word: Words.getList()[Math.floor(Math.random() * Words.getList().length)],
            state: 'default'
        };
    }

    // Retrieves a list of words that can be used
    static getList() {

        // words are stored in `localStorage`
        const words = JSON.parse(localStorage.getItem('words'));

        // get the current language
        const language = JSON.parse(localStorage.getItem('settings')).language.value;
        const languageWords = words[language];

        return languageWords;
    }
}