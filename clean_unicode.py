#!/usr/bin/env python3
"""
Clean hidden/bidirectional/suspicious Unicode characters from markdown files.
Removes Trojan Source vectors and normalizes odd whitespace safely.
"""
import sys
import unicodedata
from pathlib import Path

IGNORE_CONTROLS = {'\n', '\r', '\t'}

# Explicit replacements for commonly problematic characters.
REPLACEMENTS = {
    0x00A0: ' ',   # NO-BREAK SPACE
    0x202F: ' ',   # NARROW NO-BREAK SPACE
    0x2007: ' ',   # FIGURE SPACE
    0x2060: '',    # WORD JOINER
    0x00AD: '',    # SOFT HYPHEN
    0xFEFF: '',    # ZERO WIDTH NO-BREAK SPACE (BOM)
    0x200B: '',    # ZERO WIDTH SPACE
    0x200C: '',    # ZERO WIDTH NON-JOINER
    0x200D: '',    # ZERO WIDTH JOINER
    0x200E: '',    # LEFT-TO-RIGHT MARK
    0x200F: '',    # RIGHT-TO-LEFT MARK
    0x202A: '',    # LEFT-TO-RIGHT EMBEDDING
    0x202B: '',    # RIGHT-TO-LEFT EMBEDDING
    0x202C: '',    # POP DIRECTIONAL FORMATTING
    0x202D: '',    # LEFT-TO-RIGHT OVERRIDE
    0x202E: '',    # RIGHT-TO-LEFT OVERRIDE
    0x2066: '',    # LEFT-TO-RIGHT ISOLATE
    0x2067: '',    # RIGHT-TO-LEFT ISOLATE
    0x2068: '',    # FIRST STRONG ISOLATE
    0x2069: '',    # POP DIRECTIONAL ISOLATE
    0x2028: '\n',  # LINE SEPARATOR
    0x2029: '\n',  # PARAGRAPH SEPARATOR
}

SUSPICIOUS_CATEGORIES = {'Cf', 'Cc', 'Cs', 'Co', 'Cn', 'Zl', 'Zp'}

def normalize_char(ch):
    if ch in IGNORE_CONTROLS:
        return ch, False
    cp = ord(ch)
    if (0xFE00 <= cp <= 0xFE0F) or (0xE0100 <= cp <= 0xE01EF):
        # Variation selectors are default-ignorable and can trigger GitHub warnings.
        return '', True
    if cp in REPLACEMENTS:
        return REPLACEMENTS[cp], True
    cat = unicodedata.category(ch)
    if cat == 'Zs':
        return ' ' if ch != ' ' else ch, ch != ' '
    if cat in SUSPICIOUS_CATEGORIES:
        return '', True
    return ch, False


def clean_file(filepath):
    """Remove suspicious Unicode chars from file."""
    path = Path(filepath)
    if not path.exists():
        print(f"[ERROR] File not found: {filepath}")
        return False
    
    # Read file as bytes to preserve line endings
    try:
        data = path.read_bytes()
        content = data.decode('utf-8')
    except Exception as e:
        print(f"[ERROR] Error reading {filepath}: {e}")
        return False
    
    # Normalize content
    found = {}
    normalized = []
    for ch in content:
        replacement, changed = normalize_char(ch)
        if changed:
            cp = ord(ch)
            cat = unicodedata.category(ch)
            name = unicodedata.name(ch, 'UNKNOWN')
            key = (cp, cat, name)
            found[key] = found.get(key, 0) + 1
        normalized.append(replacement)
    normalized_text = ''.join(normalized)

    if not found:
        print(f"[OK] {filepath}: clean (no suspicious chars)")
        return False
    
    # Write cleaned content
    try:
        path.write_text(normalized_text, encoding='utf-8')
        print(f"[CLEANED] {filepath}: normalized {len(found)} codepoint(s)")
        for (cp, cat, name), count in sorted(found.items()):
            print(f"  U+{cp:04X} {name} ({cat}) count={count}")
        return True
    except Exception as e:
        print(f"[ERROR] Error writing {filepath}: {e}")
        return False

if __name__ == '__main__':
    files = [
        'docs/BOOKING_MODEL.md',
        'docs/BOOKING_STATUS.md',
        'docs/BOOKING_RUNBOOK.md',
    ]
    
    modified = []
    for f in files:
        if clean_file(f):
            modified.append(f)
    
    if modified:
        print(f"\n[SUCCESS] Cleaned {len(modified)} file(s): {', '.join(modified)}")
        sys.exit(0)
    else:
        print("\n[SUCCESS] All files already clean")
        sys.exit(0)
