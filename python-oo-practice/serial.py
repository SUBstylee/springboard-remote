"""Python serial number generator."""


class SerialGenerator:
    """Machine to create unique incrementing serial numbers.

    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """

    def __init__(self, start=0):
        '''Creates a new serial generator, starting at start number, defaults to zero if no number is passed when creating'''
        self.start = self.next = start

    def __repr__(self):
        '''Displays representation'''
        return f'SerialGenerator(start={self.start} next={self.next})'

    def generate(self):
        '''Return the serial number and set next'''
        self.next += 1
        return self.next-1

    def reset(self):
        '''Returns number back to start'''
        self.next = self.start
