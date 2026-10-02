#!/usr/bin/env python3
"""Generate Paper HTML for handwritten notes + hand-drawn arrows on a before/after X post.

Usage: python3 notes.py spec.json            # prints one HTML block per note
spec.json is a list of notes. Coordinates are artboard pixels (2000x1125 canvas).

  {"text": "date chips clipped", "side": "L", "top": 444, "target": [448, 494]}
  {"text": "name up top", "side": "R", "top": 210, "target": [1556, 270]}
  {"text": "sidebar,\\nnot a dock", "side": "M", "left": 920, "top": 230,
   "start": [1058, 256], "ctrl": [1100, 250], "target": [1126, 270]}

side L: text right-aligned to x=382, arrow starts at (392, first-line centre)
side R: text at x=1630, arrow starts at (1616, first-line centre)
side M: middle gap; give left, start and ctrl yourself
Optional "bend" (px) nudges the control point vertically for L/R notes.
Targets must sit OUTSIDE the white phone (8-12px off its edge): white on white disappears.
"""
import json, math, sys

FONT = ("font-family:Caveat;font-weight:400;font-size:46px;line-height:52px;"
        "color:#FFFFFF;white-space:pre;")
CHAR_W = 15.9  # Caveat 46px, measured


def arrow(name, s, c, e, head=20, sw=3.5, pad=16):
    dx, dy = e[0] - c[0], e[1] - c[1]
    L = math.hypot(dx, dy) or 1
    ux, uy = -dx / L, -dy / L
    pts = []
    for ang in (math.radians(32), -math.radians(32)):
        pts.append((e[0] + (ux * math.cos(ang) - uy * math.sin(ang)) * head,
                    e[1] + (ux * math.sin(ang) + uy * math.cos(ang)) * head))
    xs = [s[0], c[0], e[0]] + [p[0] for p in pts]
    ys = [s[1], c[1], e[1]] + [p[1] for p in pts]
    minx, miny = math.floor(min(xs)) - pad, math.floor(min(ys)) - pad
    w, h = math.ceil(max(xs)) + pad - minx, math.ceil(max(ys)) + pad - miny
    f = lambda p: f"{p[0]-minx:.1f} {p[1]-miny:.1f}"
    stroke = f'stroke="#FFFFFF" stroke-width="{sw}" stroke-linecap="round" fill="none"'
    return (f'<svg layer-name="Arrow | {name}" width="{w}" height="{h}" viewBox="0 0 {w} {h}" fill="none" '
            f'style="position:absolute;left:{minx}px;top:{miny}px;">'
            f'<path d="M {f(s)} Q {f(c)} {f(e)}" {stroke}/>'
            f'<path d="M {f(pts[0])} L {f(e)} L {f(pts[1])}" {stroke} stroke-linejoin="round"/></svg>')


def note(n):
    text, top, side = n["text"], n["top"], n["side"]
    name = text.replace("\n", " ")
    y = top + 26
    bend = n.get("bend", 0)
    if side == "L":
        left = 382 - round(max(len(l) for l in text.split("\n")) * CHAR_W)
        s, c = (392, y), (428, y + bend)
    elif side == "R":
        left, s, c = 1630, (1616, y), (1582, y + bend)
    else:
        left, s, c = n["left"], tuple(n["start"]), tuple(n["ctrl"])
    html = f'<div layer-name="Note | {name}" style="position:absolute;left:{left}px;top:{top}px;{FONT}">{text}</div>'
    return html + arrow(name, s, c, tuple(n["target"]))


if __name__ == "__main__":
    for n in json.load(open(sys.argv[1])):
        print(note(n))
