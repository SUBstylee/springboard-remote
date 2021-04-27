def print_upper_words(words, must_start_with):
    '''Takes in a list of words, then prints them out in uppercase, if they start with correct letters.'''
    for word in words:
        for char in must_start_with:
            if word[0] == char:
                print(word.upper())


# this should print "HELLO", "HEY", "YO", and "YES"
print_upper_words(["hello", "hey", "goodbye", "yo", "yes"],
                  must_start_with={"h", 'y'})
