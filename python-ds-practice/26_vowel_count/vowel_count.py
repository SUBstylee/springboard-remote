VOWELS = set('aeiou')  # originally put this in function


def vowel_count(phrase):
    """Return frequency map of vowels, case-insensitive.

        >>> vowel_count('rithm school')
        {'i': 1, 'o': 2}

        >>> vowel_count('HOW ARE YOU? i am great!') 
        {'o': 2, 'a': 3, 'e': 2, 'u': 1, 'i': 1}
    """
    phrase = phrase.lower()
    counter = {}

    for char in phrase:
        if char in VOWELS:
            counter[char] = counter.get(char, 0)+1
    return counter
