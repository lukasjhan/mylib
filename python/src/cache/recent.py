from typing import TypeVar, Dict, Tuple
import time

K = TypeVar('K')
T = TypeVar('T')


class RecentCache:
    def __init__(self, cache_size: int):
        self.cache: Dict[K, Tuple[T, int]] = {}
        self.cache_size = cache_size

    def get(self, key: K) -> T:
        cache_data = self.cache.get(key)
        if cache_data:
            self.cache[key] = (cache_data[0], time.time())
            return cache_data[0]
        return None

    def set(self, key: K, value: T) -> None:
        if len(self.cache) >= self.cache_size:
            least_recent = self.get_least_recent()
            if least_recent:
                del self.cache[least_recent]

        self.cache[key] = (value, time.time())

    def get_least_recent(self) -> K:
        least_recent_key = None
        least_recent_time = None

        for key, value in self.cache.items():
            if not least_recent_time or value[1] < least_recent_time:
                least_recent_key = key
                least_recent_time = value[1]

        return least_recent_key
