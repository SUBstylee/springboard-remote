def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?

        >>> same_frequency(551122, 221515)
        True

        >>> same_frequency(321142, 3212215)
        False

        >>> same_frequency(1212, 2211)
        True
    """
    num1 = sorted([int(n) for n in str(num1)])
    num2 = sorted([int(n) for n in str(num2)])
    if num1 == num2:
        return True
    return False

# this works, but very different from solution file
