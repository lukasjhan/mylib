from typing import Tuple

def positive_modulo(x: int, n: int) -> int:
    return ((x % n) + n) % n

def get_even(number: int) -> int:
    return number + (0 if number % 2 == 0 else 1)

def is_float_same(a: float, b: float) -> bool:
    return abs(a - b) < 0.000001

def is_between(x: float, a: float, b: float) -> bool:
    return x >= min(a, b) and x <= max(a, b)

def clamp(number: float, min_val: float = 0, max_val: float = 1) -> float:
    return max(min(number, max_val), min_val)

def gcd(a: int, b: int) -> int:
    if b == 0:
        return a
    else:
        return gcd(b, a % b)

def reduce_fraction(numerator: int, denominator: int) -> Tuple[int, int]:
    divisor = gcd(numerator, denominator)
    return (numerator // divisor, denominator // divisor)