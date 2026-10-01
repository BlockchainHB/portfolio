"""Shared primitives for the portfolio Systems diagrams (diagram-design skill rules, hasaam-portfolio skin)."""
import html, base64, os
_FONT = base64.b64encode(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "geist-mono-latin.woff2"), "rb").read()).decode()
SANS = "SF Pro"
MONO = "Geist Mono"
THEMES = {
    "light": dict(paper="#F3F5F9", node="#FFFFFF", ink="#18181B", muted="#52525B", soft="#71717A",
                  rule="#18181B1F", solid="#D4D4D8", line="#18181B47", fillTotal="#18181B14", onAccent="#FFFFFF"),
    "dark": dict(paper="#141414", node="#1C1C1C", ink="#EDEDED", muted="#A1A1A1", soft="#8F8F8F",
                 rule="#EDEDED1F", solid="#EDEDED3D", line="#EDEDED47", fillTotal="#EDEDED14", onAccent="#0B0B0B"),
}
ACCENTS = {  # project accents, light / dark
    "lf": ("#0066CC", "#3395FF"), "gc": ("#B8862B", "#D9B36A"),
    "pr": ("#2F8F5B", "#4CC38A"), "dh": ("#1F7A57", "#3DD68C"),
}

class D:
    def __init__(self, theme, project, slug, title, desc, w=560, h=320):
        self.t = dict(THEMES[theme]); a = ACCENTS[project][0 if theme == "light" else 1]
        self.t["accent"] = a; self.t["tint"] = a + ("14" if theme == "light" else "24")
        self.slug, self.title, self.desc, self.w, self.h = f"{slug}-{theme}", title, desc, w, h
        self.back, self.front = [], []   # connectors first, nodes after (skill: draw arrows before boxes)
    def c(self, k): return self.t.get(k, k)
    # text
    def text(self, x, y, s, size=11, color="ink", font=SANS, weight=400, anchor="start", spacing=None, layer="front"):
        ls = f' letter-spacing="{spacing}"' if spacing else ""
        (self.front if layer == "front" else self.back).append(
            f'<text x="{x}" y="{y}" font-family="{font}" font-size="{size}" font-weight="{weight}" fill="{self.c(color)}" text-anchor="{anchor}"{ls}>{html.escape(s)}</text>')
    def eyebrow(self, x, y, s, anchor="start", color="soft"):
        self.text(x, y, s.upper(), 8, color, MONO, 500, anchor, "0.1em")
    def rect(self, x, y, w, h, fill="node", stroke="line", sw=1, rx=6, dash=None, layer="front"):
        d = f' stroke-dasharray="{dash}"' if dash else ""
        st = f' stroke="{self.c(stroke)}" stroke-width="{sw}"' if stroke else ""
        (self.front if layer == "front" else self.back).append(
            f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{self.c(fill)}"{st}{d}/>')
    def node(self, x, y, w, h, name, sub=None, focal=False, kind="backend", align="middle", size=11):
        fill, stroke = ("tint", "accent") if focal else {"backend": ("node", "line"), "store": ("fillTotal", "line"),
                                                          "optional": ("node", "line")}[kind]
        self.rect(x, y, w, h, "paper", None)            # opaque mask
        self.rect(x, y, w, h, fill, stroke, 1.25 if focal else 1, dash="4 3" if kind == "optional" else None)
        cx = x + w / 2 if align == "middle" else x + 12
        anchor = "middle" if align == "middle" else "start"
        if sub:
            self.text(cx, y + h / 2 - 2, name, size, "ink", SANS, 500, anchor)
            self.text(cx, y + h / 2 + 11, sub, 9, "accent" if focal else "soft", MONO, 400, anchor)
        else:
            self.text(cx, y + h / 2 + 4, name, size, "ink", SANS, 500, anchor)
    # connectors: orthogonal polyline with rounded corners (r<=8), explicit arrowhead
    def path(self, pts, color="muted", dash=None, width=1.2, head=True, r=8):
        d = f"M{pts[0][0]} {pts[0][1]}"
        for i in range(1, len(pts) - 1):
            (x0, y0), (x1, y1), (x2, y2) = pts[i - 1], pts[i], pts[i + 1]
            l1 = abs(x1 - x0) + abs(y1 - y0); l2 = abs(x2 - x1) + abs(y2 - y1)
            rr = min(r, l1 / 2, l2 / 2)
            ax = x1 - (rr if x1 > x0 else -rr if x1 < x0 else 0); ay = y1 - (rr if y1 > y0 else -rr if y1 < y0 else 0)
            bx = x1 + (rr if x2 > x1 else -rr if x2 < x1 else 0); by = y1 + (rr if y2 > y1 else -rr if y2 < y1 else 0)
            d += f" L{ax:g} {ay:g} Q{x1} {y1} {bx:g} {by:g}"
        d += f" L{pts[-1][0]} {pts[-1][1]}"
        ds = f' stroke-dasharray="{dash}"' if dash else ""
        self.back.append(f'<path d="{d}" fill="none" stroke="{self.c(color)}" stroke-width="{width}" stroke-linecap="round" stroke-linejoin="round"{ds}/>')
        if head:
            (x0, y0), (x1, y1) = pts[-2], pts[-1]
            if x1 > x0: p = f"{x1} {y1} {x1-7} {y1-3.5} {x1-7} {y1+3.5}"
            elif x1 < x0: p = f"{x1} {y1} {x1+7} {y1-3.5} {x1+7} {y1+3.5}"
            elif y1 > y0: p = f"{x1} {y1} {x1-3.5} {y1-7} {x1+3.5} {y1-7}"
            else: p = f"{x1} {y1} {x1-3.5} {y1+7} {x1+3.5} {y1+7}"
            self.back.append(f'<polygon points="{p}" fill="{self.c(color)}"/>')
    def label(self, cx, cy, s, color="soft"):
        """Arrow label on an opaque paper mask; caller places cy with a 6-10px gap from the stroke."""
        s = s.upper(); w = round((len(s) * 0.62 * 8 * 1.1 + 8) / 4 + 0.49) * 4
        self.back.append(f'<rect x="{cx - w/2:g}" y="{cy - 6}" width="{w}" height="12" rx="2" fill="{self.c("paper")}"/>')
        self.back.append(f'<text x="{cx}" y="{cy + 3}" font-family="{MONO}" font-size="8" fill="{self.c(color)}" text-anchor="middle" letter-spacing="0.06em">{html.escape(s)}</text>')
    def raw(self, s, layer="front"): (self.front if layer == "front" else self.back).append(s)
    def svg(self):
        return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {self.w} {self.h}" width="{self.w}" height="{self.h}" role="img" aria-labelledby="{self.slug}-title {self.slug}-desc">'
                f'<title id="{self.slug}-title">{html.escape(self.title)}</title><desc id="{self.slug}-desc">{html.escape(self.desc)}</desc>'
                f'<style>@font-face{{font-family:"Geist Mono";src:url(data:font/woff2;base64,{_FONT}) format("woff2");font-weight:100 900}}</style>'
                f'<rect width="{self.w}" height="{self.h}" fill="{self.c("paper")}"/>' + "".join(self.back) + "".join(self.front) + "</svg>")
