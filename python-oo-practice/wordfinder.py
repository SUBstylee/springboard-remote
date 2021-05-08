"""Word Finder: finds random words from a dictionary."""

import random


class WordFinder:
    """Class for finding random words from a file.

    >>> wf = WordFinder("simple.txt") #created this file for tests
    3 words read

    >>> wf.random() in ["cat", "dog", "porcupine"]
    True

    >>> wf.random() in ["cat", "dog", "porcupine"]
    True

    >>> wf.random() in ["cat", "dog", "porcupine"]
    True
    """

    def __init__(self, path):
        '''Read file and count how many items are in it'''
        file = open(path)
        self.words = self.parse(file)
        print(f'{len(self.words)} words read')

    def parse(self, file):
        '''Parse file to list of words'''
        return [word.strip() for word in file]

    def random(self):
        '''Return a random word from the file'''
        return random.choice(self.words)


class SpecialWordFinder(WordFinder):
    """Specialized WordFinder that excludes blank lines/comments.

    >>> swf = SpecialWordFinder("complex.txt") #created this file for tests
    3 words read

    >>> swf.random() in ["pear", "carrot", "kale"]
    True

    >>> swf.random() in ["pear", "carrot", "kale"]
    True

    >>> swf.random() in ["pear", "carrot", "kale"]
    True
    """

    def parse(self, file):
        '''Parse file to list of words excluding empty lines and comments'''
        return [word.strip() for word in file if word.strip() and not word.startswith('#')]
