import base64


def bytes_to_base64(byte_array: bytes) -> str:
    base64_bytes = base64.b64encode(byte_array)
    base64_string = base64_bytes.decode('utf-8')
    return base64_string


def base64_to_bytes(base64_string: str) -> bytes:
    base64_bytes = base64_string.encode('utf-8')
    bytes_data = base64.b64decode(base64_bytes)
    return bytes_data
