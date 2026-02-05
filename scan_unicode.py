#!/usr/bin/env python3
"""Scan files for suspicious Unicode (bidi/hidden/odd spaces) with line/col."""
import sys
import unicodedata
from pathlib import Path

IGNORE_CONTROLS = {'\n', '\r', '\t'}
SUSPICIOUS_CATEGORIES = {'Cf', 'Cc', 'Cs', 'Co', 'Cn', 'Zl', 'Zp'}


def is_suspicious(ch):
    if ch in IGNORE_CONTROLS:
        return False
    cp = ord(ch)
    if (0xFE00 <= cp <= 0xFE0F) or (0xE0100 <= cp <= 0xE01EF):
        return True
    cat = unicodedata.category(ch)
    if cat == 'Zs':
        return ch != ' '
    return cat in SUSPICIOUS_CATEGORIES


def iter_targets(args):
    if args:
        for arg in args:
            path = Path(arg)
            if path.is_dir():
                yield from path.rglob('*.md')
            elif path.is_file():
                yield path
        return
    # Default: scan SSOT docs
    yield Path('docs/BOOKING_MODEL.md')
    yield Path('docs/BOOKING_STATUS.md')
    yield Path('docs/BOOKING_RUNBOOK.md')


def scan_file(path):
    try:
        data = path.read_bytes()
        text = data.decode('utf-8')
    except Exception as exc:
        print(f"[ERROR] {path}: {exc}")
        return False

    counts = {}
    positions = {}
    line_no = 1
    col_no = 0
    for ch in text:
        if ch == '\n':
            line_no += 1
            col_no = 0
            continue
        col_no += 1
        if not is_suspicious(ch):
            continue
        cp = ord(ch)
        cat = unicodedata.category(ch)
        name = unicodedata.name(ch, 'UNKNOWN')
        key = (cp, cat, name)
        counts[key] = counts.get(key, 0) + 1
        positions.setdefault(key, []).append((line_no, col_no))

    if not counts:
        print(f"[OK] {path}: no suspicious Unicode found")
        return False

    print(f"[FILE] {path}")
    for key in sorted(counts.keys()):
        cp, cat, name = key
        count = counts[key]
        print(f"  U+{cp:04X} {name} ({cat}) count={count}")
        for ln, col in positions[key]:
            print(f"    at {ln}:{col}")
    return True


def main():
    args = sys.argv[1:]
    found_any = False
    for path in iter_targets(args):
        if scan_file(path):
            found_any = True
        print()
    if not found_any:
        sys.exit(0)


if __name__ == '__main__':
    main()
