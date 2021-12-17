import foods from './foods';
import { choice, remove } from './helpers';

// Randomly draw a fruit from the array
const fruit = choice(foods);
// Log the message “I’d like one RANDOMFRUIT, please.”
console.log(`I would like one ${fruit}, please.`);
// Log the message “Here you go: RANDOMFRUIT”
console.log(`Here you go: ${fruit}`);
// Log the message “Delicious! May I have another?”
console.log(`Delicious! May I have another ${fruit}?`);
// Remove the fruit from the array of fruits
let remaining = remove(foods, fruit);
// Log the message “I’m sorry, we’re all out. We have FRUITSLEFT left.”
console.log(`I'm sorry, we're all out of ${fruit}.  We have ${remaining.length} pieces of other fruit left.`);
