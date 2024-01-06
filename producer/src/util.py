import random


def randomize_delay(delay_ms):
    """returns a new time randomized up or down from the initial value"""
    max_offset = delay_ms / 2
    return random.uniform(delay_ms - max_offset, delay_ms + max_offset)
