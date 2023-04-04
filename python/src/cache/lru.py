from typing import TypeVar, Callable, List

K = TypeVar('K')
T = TypeVar('T')


class CacheElement:
    def __init__(self, key: K, value: T):
        self.key = key
        self.value = value


class LRUCache:
    def __init__(self, size: int, eq_fn: Callable[[K, K], bool] = lambda k1, k2: k1 == k2):
        self.data_array: List[CacheElement] = []
        self.max_size = size
        self.eq_fn = eq_fn

    def set(self, key: K, value: T) -> None:
        index = next((i for i, p in enumerate(self.data_array)
                     if self.eq_fn(p.key, key)), -1)
        data = CacheElement(key, value)
        if index > -1:
            self.data_array.pop(index)
        elif len(self.data_array) == self.max_size - 1:
            self.data_array.pop(0)
        self.data_array.append(data)

    def get(self, key: K) -> T:
        index = next((i for i, p in enumerate(self.data_array)
                     if self.eq_fn(p.key, key)), -1)
        if index > -1:
            pair = self.data_array.pop(index)
            self.data_array.append(pair)
            return pair.value
        return None
