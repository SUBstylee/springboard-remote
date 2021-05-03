VOWELS = set('aeiou')


def reverse_vowels(s):
    """Reverse vowels in a string.

    Characters which re not vowels do not change position in string, but all
    vowels (y is not a vowel), should reverse their order.

    >>> reverse_vowels("Hello!")
    'Holle!'

    >>> reverse_vowels("Tomatoes")
    'Temotaos'

    >>> reverse_vowels("Reverse Vowels In A String")
    'RivArsI Vewols en e Streng'

    reverse_vowels("aeiou")
    'uoiea'

    reverse_vowels("why try, shy fly?")
    'why try, shy fly?''
    """
    str_lst = list(s)
    front = 0
    back = len(s)-1
    while front < back:
        if str_lst[front] not in VOWELS:
            front += 1
        elif str_lst[back] not in VOWELS:
            back -= 1
        else:
            str_lst[front], str_lst[back] = str_lst[back], str_lst[front]
            front += 1
            back -= 1
    return ''.join(str_lst)
