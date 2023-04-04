from number import reduce_fraction

class Ratio:
    def __init__(self, numerator: int, denominator: int):
        reduced_numerator, reduced_denominator = reduce_fraction(numerator, denominator)
        self.numerator = reduced_numerator
        self.denominator = reduced_denominator

    def getData(self) -> tuple[int, int]:
        return (self.numerator, self.denominator)

    def getRatio(self) -> float:
        return self.numerator / self.denominator

    def toString(self, delimiter: str = "/") -> str:
        return f"{self.numerator}{delimiter}{self.denominator}"