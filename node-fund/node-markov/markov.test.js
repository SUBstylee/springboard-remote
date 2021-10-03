const { MarkovMachine } = require('./markov');

describe('markov machine', () => {
    let mm1 = new MarkovMachine('here are some test words'); //all unique words
    let mm2 = new MarkovMachine('I am you and you are I'); //some repeats
    let mm3 = new MarkovMachine('a b c'); //for quicker testing

    test('constructor -- are the arrays being created with correct text?', () => {
        expect(mm1.words).toEqual(['here', 'are', 'some', 'test', 'words']);
        expect(mm2.words).toEqual(['I', 'am', 'you', 'and', 'you', 'are', 'I']);
    });

    test('makeChains -- are chains being mapped correctly?', () => {

        expect(mm1.chains).toEqual(new Map([
            ['here', ['are']],
            ['are', ['some']],
            ['some', ['test']],
            ['test', ['words']],
            ['words', [null]]
        ]));

        expect(mm2.chains).toEqual(new Map([
            ['I', ['am', null]],
            ['am', ['you']],
            ['you', ['and', 'are']],
            ['and', ['you']],
            ['are', ['I']]
        ]));
    });

    test('choice  -- are choices being made?', () => {

        expect(MarkovMachine.choice(['a', 'a', 'a', 'a'])).toEqual('a');
        expect(['a', 'b', 'c', 'd']).toContain(MarkovMachine.choice(['a', 'b', 'c', 'd']));
    });

    test('makeText -- is text being made in the correct order based on chain?', () => {
        let output = mm3.makeText()
        expect(['a b c', 'b c', 'c']).toContain(output);
        expect(output.endsWith('c')).toBe(true);
    })

    test('makeText(numWords) -- is text the correct length?', () => {
        let output = mm3.makeText(2);
        let outputStripped = output.split(/[ \r\n]+/); //same regex as in constructor
        expect([1, 2]).toContain(outputStripped.length);
        expect([0, 3]).not.toContain(outputStripped.length);
    });
});