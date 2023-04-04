from typing import List, TypeVar, Callable, Union

T = TypeVar('T')
E = TypeVar('E')

def binary_search(arr: List[T], value: E, compare: Callable[[T, E], int], findLowerBound: bool = False) -> Union[int, None]:
    left = 0
    right = len(arr) - 1
    pivot = 0

    if len(arr) == 0:
        return None

    while left <= right:
        pivot = (left + right) // 2
        ret = compare(arr[pivot], value)
        if ret <= 0:
            right = pivot - 1
        elif ret > 0:
            left = pivot + 1

    if left < len(arr) and compare(arr[left], value) == 0:
        return left

    return left if findLowerBound else None