function guessingGame() {
    const secretNumber = Math.floor(Math.random() * 100);
    let correctGuess = false;
    let numGuesses = 0;
    return function guess(num) {
        if (correctGuess) return 'The game is over, you already won!';
        numGuesses++;
        if (num === secretNumber) {
            correctGuess = true;
            const guesses = numGuesses > 1 ? 'guesses' : 'guess';
            return `You win! You found ${num} in ${numGuesses} ${guesses}.`;
        }
        if (num > secretNumber) return `${num} is too high!`;
        if (num < secretNumber) return `${num} is too low!`;
    };
};

module.exports = { guessingGame };
