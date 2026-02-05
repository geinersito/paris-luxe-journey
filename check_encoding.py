#!/usr/bin/env python3
"""Check for any non-ASCII or suspicious characters in files."""
from pathlib import Path

def check_file(filepath):
    """Report all non-ASCII characters."""
    path = Path(filepath)
    data = path.read_bytes()
    
    non_ascii = []
    for i, byte in enumerate(data):
        if byte > 127:
            non_ascii.append((i, byte))
    
    if not non_ascii:
        print(f"[OK] {filepath}: pure ASCII")
        return
    
    print(f"[INFO] {filepath}: found {len(non_ascii)} non-ASCII bytes")
    
    # Group by byte value
    byte_counts = {}
    for pos, byte in non_ascii:
        byte_counts[byte] = byte_counts.get(byte, 0) + 1
    
    print(f"  Byte distribution:")
    for byte, count in sorted(byte_counts.items()):
        try:
            # Try to decode as UTF-8 continuation
            char_hex = f"0x{byte:02X}"
            print(f"    {char_hex}: {count}x")
        except:
            print(f"    0x{byte:02X}: {count}x")

if __name__ == '__main__':
    files = [
        'docs/BOOKING_MODEL.md',
        'docs/BOOKING_STATUS.md',
        'docs/BOOKING_RUNBOOK.md',
    ]
    
    for f in files:
        check_file(f)
        print()
