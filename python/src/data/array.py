from typing import List


def is_continuous(arr: List[int]) -> bool:
    if len(arr) == 0:
        return False

    arr.sort()

    for i in range(1, len(arr)):
        if arr[i] != arr[i-1] + 1:
            return False

    return True
