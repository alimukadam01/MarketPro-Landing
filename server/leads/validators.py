"""
Pakistani mobile validation — server-side mirror of the frontend's phone.ts.

Accepts local `03XXXXXXXXX` and international `+92…` / `0092…` / `92…` forms and
normalises them to the canonical local form `03XXXXXXXXX`. The national
significant number is `3` + 9 digits.
"""
import re

_NSN_RE = re.compile(r"^3\d{9}$")


def normalize_pk_mobile(raw: str) -> str | None:
    """Return canonical `03XXXXXXXXX`, or None if `raw` isn't a PK mobile."""
    if not raw:
        return None

    s = raw.strip()
    has_plus = s.startswith("+")
    digits = re.sub(r"\D", "", s)
    s = ("+" + digits) if has_plus else digits

    if s.startswith("+92"):
        s = s[3:]
    elif s.startswith("0092"):
        s = s[4:]
    elif s.startswith("92") and len(s) == 12:
        s = s[2:]
    elif s.startswith("0"):
        s = s[1:]

    if not _NSN_RE.match(s):
        return None
    return "0" + s
