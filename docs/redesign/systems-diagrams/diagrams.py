"""The nine Systems card diagrams. Run: python3 diagrams.py  ->  writes <slug>-<theme>.svg"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from lib import D, SANS, MONO

def gc_image_quality(th):
    d = D(th, "gc", "gc-image-quality", "Keeping generated images shippable",
          "Flowchart of an Auto Post render: provider retries and fallbacks, then a vision judge that allows one regeneration before shipping.")
    d.eyebrow(24, 32, "Auto post, one slot")
    # connectors
    d.path([(144, 76), (168, 76)])
    d.path([(224, 76), (256, 76)]); d.label(240, 62, "yes")
    d.path([(376, 76), (424, 76)], "accent"); d.label(400, 62, "pass", "accent")
    d.path([(196, 104), (196, 176)]); d.label(214, 140, "no")
    d.path([(140, 196), (84, 196), (84, 96)])
    d.path([(316, 96), (316, 176)]); d.label(336, 140, "fail")
    d.path([(372, 196), (424, 196)]); d.label(398, 182, "again")
    d.path([(316, 216), (316, 256), (52, 256), (52, 96)], dash="5 4"); d.label(184, 242, "one redo, 10 s")
    # nodes
    d.node(24, 56, 120, 40, "Render", "gpt-image-2.5-flare")
    d.raw(f'<polygon points="196,48 224,76 196,104 168,76" fill="{d.c("node")}" stroke="{d.c("line")}" stroke-width="1"/>')
    d.text(196, 80, "ok?", 9, "muted", MONO, 400, "middle")
    d.node(256, 56, 120, 40, "Vision judge", "gemini-3-flash", focal=True)
    d.node(424, 56, 112, 40, "Ship", "ready to post")
    d.node(140, 176, 112, 40, "Retry or fall back", "2 per model, 4 total")
    d.node(260, 176, 112, 40, "Regenerate", "judge said no")
    d.node(424, 176, 112, 40, "Ship, flagged", "best attempt", kind="optional")
    d.text(24, 300, "Fallback: flash-image, then pro-image. If the judge errors, the image ships and Sentry logs it.", 8.5, "soft", MONO)
    return d

def lf_fanout(th):
    d = D(th, "lf", "lf-inngest-fanout", "One event, twenty functions",
          "Web app, MCP tools and cron send one capture event that fans out to one Inngest function per research feature, each with its own concurrency, then through rate-limited gateways to Supabase.")
    for x, s in [(20, "Surfaces"), (124, "One event"), (276, "Feature, concurrency"), (444, "Limits, storage")]:
        d.eyebrow(x, 28, s)
    # connectors
    d.path([(100, 104), (112, 104), (112, 152), (124, 152)], r=6)
    d.path([(100, 160), (124, 160)])
    d.path([(100, 216), (112, 216), (112, 168), (124, 168)], r=6)
    ys = [52, 88, 124, 160, 196, 232, 268]
    d.path([(236, 160), (256, 160)], head=False)
    d.path([(256, 52), (256, 268)], head=False)
    for y in ys: d.path([(256, y), (276, y)], head=y != 268)
    for y in ys[:-1]: d.path([(412, y), (428, y)], head=False)
    d.path([(428, 52), (428, 232)], head=False)
    d.path([(428, 140), (444, 140)])
    d.path([(492, 160), (492, 200)])
    # nodes
    for y, s in zip([88, 144, 200], ["Web app", "MCP tool", "Cron"]): d.node(20, y, 80, 32, s)
    d.rect(124, 144, 112, 32, "accent", None, rx=16)
    d.text(180, 164, "capture/requested", 9, "onAccent", MONO, 500, "middle")
    feats = [("Market research", "×2"), ("Market refresh", "×2"), ("Product tracking", "×5"), ("Keyword discovery", "×4"),
             ("Listing builder", "×3"), ("Review analysis", "×2")]
    for i, (n, c) in enumerate(feats):
        y = ys[i] - 14; focal = i == 0
        d.rect(276, y, 136, 28, "paper", None); d.rect(276, y, 136, 28, "tint" if focal else "node", "accent" if focal else "line", 1.25 if focal else 1)
        d.text(288, y + 18, n, 10.5, "ink", SANS, 400); d.text(400, y + 18, c, 9, "accent" if focal else "soft", MONO, 400, "end")
    d.rect(276, 254, 136, 28, "paper", None, dash=None); d.rect(276, 254, 136, 28, "paper", "line", 1, dash="4 3")
    d.text(288, 272, "+14 more", 9, "soft", MONO)
    d.node(444, 120, 96, 40, "Gateway", "per rate limit")
    d.node(444, 200, 96, 40, "Supabase", "every result", kind="store")
    d.text(276, 306, "3 retries each | Redis budgets fail closed", 8.5, "soft", MONO)
    return d

def lf_approval(th):
    d = D(th, "lf", "lf-launchie-approval", "Agent proposes, seller approves",
          "Swimlane of a Launchie ads change: Launchie proposes a checked change set, the seller approves on iOS with MFA, the apply engine re-checks live values and applies, and a nightly ledger feeds outcomes back.")
    lanes = [(28, "Launchie"), (92, "You, on iOS"), (156, "Apply engine"), (220, "Ledger")]
    for i, (y, s) in enumerate(lanes):
        d.eyebrow(16, y + 16, s)
        if i: d.raw(f'<line x1="12" y1="{y}" x2="548" y2="{y}" stroke="{d.c("rule")}" stroke-width="1"/>', "back")
    d.raw(f'<line x1="12" y1="284" x2="548" y2="284" stroke="{d.c("rule")}" stroke-width="1"/>', "back")
    # connectors
    d.path([(232, 60), (308, 60), (316, 68), (316, 106)][0:1] + [(316, 60), (316, 106)], "accent", width=1.4)
    d.label(274, 46, "change set", "accent")
    d.path([(376, 124), (468, 124), (468, 170)])
    d.path([(468, 206), (468, 234)])
    d.path([(400, 252), (168, 252), (168, 78)], dash="5 4"); d.label(284, 238, "track record")
    # nodes
    d.node(104, 42, 128, 36, "Propose changes", "policy check")
    d.node(256, 106, 120, 36, "Approve", "MFA, hold if large", focal=True)
    d.node(400, 170, 136, 36, "Re-check, apply", "live values, batches")
    d.node(400, 234, 136, 36, "Measure outcomes", "daily at 06:30", kind="store")
    d.text(24, 130, "or rejected,", 8.5, "soft", MONO); d.text(24, 142, "expires in 24 h", 8.5, "soft", MONO)
    d.text(392, 108, "Launchie's token", 8.5, "soft", MONO); d.text(392, 120, "can't reach this", 8.5, "soft", MONO)
    d.text(16, 306, "Up to 50 changes a set, 3-day cooldown. A cron resumes partial applies.", 8.5, "soft", MONO)
    return d

def lf_launchie_cloudflare(th):
    d = D(th, "lf", "lf-launchie-cloudflare", "Launchie on Cloudflare",
          "Deployment of Launchie: the iOS app talks to the Next.js API on Vercel, which routes to one Durable Object per seller thread on Cloudflare; threads call the AI Gateway and a signed MCP tool proxy, and an account object keeps memory and schedules briefs.")
    def zone(x, y, w, h, label):
        d.rect(x, y, w, h, "fillTotal", "line", 1, rx=8, dash="4 4", layer="back")
        tw = round(len(label) * 5.5 + 12)
        d.rect(x + 8, y - 6, tw, 12, "paper", None, rx=2, layer="back")
        d.text(x + 14, y + 3, label.upper(), 8, "soft", MONO, 500, spacing="0.1em", layer="back")
    def tag(x, y, s_, focal=False):
        w = round(len(s_) * 5 + 8)
        d.rect(x, y, w, 12, "paper" if not focal else "tint", "accent" if focal else "line", 0.8, rx=2)
        d.text(x + w / 2, y + 9, s_, 7, "accent" if focal else "soft", MONO, 500, "middle", "0.08em")
    zone(116, 24, 132, 256, "Vercel"); zone(284, 24, 260, 256, "Cloudflare worker")
    # paths
    d.path([(96, 64), (128, 64)])
    d.path([(236, 64), (300, 64)], "accent", width=1.4); d.label(268, 50, "by name", "accent")
    d.path([(300, 148), (236, 148)]); d.label(268, 134, "model")
    d.path([(300, 232), (236, 232)]); d.label(268, 218, "hmac")
    d.path([(436, 72), (408, 72)])
    d.path([(408, 112), (436, 112)], dash="5 4")
    # nodes
    d.node(16, 44, 80, 40, "iOS app", "streams")
    for y, n, sub in [(44, "Next.js API", "auth, MFA"), (128, "AI Gateway", "gpt-5.6-terra"), (212, "MCP tools", "17 via proxy")]:
        d.node(128, y, 108, 40, n, sub)
    d.rect(300, 44, 108, 208, "paper", None); d.rect(300, 44, 108, 208, "tint", "accent", 1.25)
    tag(308, 52, "DO", True)
    d.rect(352, 52, 48, 12, "paper", "accent", 0.8, rx=2); d.text(376, 61, "PER THREAD", 6.5, "accent", MONO, 500, "middle", "0.04em")
    d.text(312, 84, "Thread agent", 11, "ink", SANS, 500); d.text(312, 97, "Agents SDK", 9, "accent", MONO)
    for i, chip in enumerate(["SQLite store", "27 tools", "10 steps, 120 s", "compacts at 100k"]):
        y0 = 112 + i * 32
        d.rect(308, y0, 92, 24, "fillTotal", "line", 0.8, rx=4); d.text(314, y0 + 16, chip, 8.5, "ink", MONO)
    d.rect(436, 44, 100, 96, "paper", None); d.rect(436, 44, 100, 96, "node", "line", 1)
    tag(444, 52, "DO")
    d.text(448, 84, "Account", 11, "ink", SANS, 500)
    d.text(448, 100, "threads", 8.5, "soft", MONO); d.text(448, 112, "memory", 8.5, "soft", MONO); d.text(448, 124, "brief alarms", 8.5, "soft", MONO)
    for i, line in enumerate(["Briefs fire from", "alarms in the", "seller's timezone,", "so DST can't", "move them."]):
        d.text(440, 164 + i * 12, line, 8.5, "soft", MONO)
    d.text(16, 304, "Each thread is its own object with its own SQLite, named by seller and thread.", 8.5, "soft", MONO)
    return d

def lf_layers(th):
    d = D(th, "lf", "lf-tool-layer", "One tool layer, three surfaces",
          "Layer stack of the Launch Fast tool layer: Claude, ChatGPT and Launchie call one MCP server with 18 tools, which calls 12 internal routes that read Supabase marts.")
    rows = [("L1", "Claude, ChatGPT, Launchie", "OAuth scopes | signed proxy", False),
            ("L2", "MCP server", None, True),
            ("L3", "12 internal /mcp routes", "IDs stripped, output sanitized", False),
            ("L4", "Supabase marts", "with a sync-freshness summary", False)]
    d.eyebrow(24, 28, "Calls")
    d.path([(36, 40), (36, 256)], "soft", width=1)
    for i, (tag, name, note, focal) in enumerate(rows):
        y0 = 40 + i * 56
        d.rect(72, y0, 464, 56, "tint" if focal else ("node" if i % 2 == 0 else "paper"), "accent" if focal else "rule", 1.25 if focal else 1, rx=0)
        d.text(84, y0 + 32, tag, 8, "accent" if focal else "soft", MONO, 500, spacing="0.1em")
        d.text(116, y0 + (28 if focal else 32), name, 13, "ink", SANS, 500)
        if focal:
            d.text(116, y0 + 42, "createMcpServer()", 9, "accent", MONO)
            for k in range(18):
                cx = 330 + (k % 9) * 22; cy = y0 + 14 + (k // 9) * 16
                if k < 12: d.rect(cx, cy, 12, 10, "accent", None, rx=2)
                else: d.rect(cx, cy, 12, 10, "tint", "accent", 1, rx=2)
        else:
            d.text(524, y0 + 32, note, 9, "soft", MONO, 400, "end")
    d.text(72, 284, "18 tools: 12 Amazon, 6 research. 17 of them render a chat widget.", 9, "muted", MONO)
    d.text(72, 300, "A test fails if Launchie's tool schemas drift from the server's.", 9, "muted", MONO)
    return d

def gc_sequence(th):
    d = D(th, "gc", "gc-agent-thread", "One agent per chat thread",
          "Sequence of a chat image request: the browser opens a ticket to the thread's Durable Object, the user approves, the agent makes a signed call to Convex, Convex renders and returns the image to the agent as a hidden turn, and the agent replies.")
    xs = [70, 210, 350, 490]
    for x in xs: d.raw(f'<line x1="{x}" y1="56" x2="{x}" y2="304" stroke="{d.c("rule")}" stroke-width="1" stroke-dasharray="3 3"/>', "back")
    d.rect(205, 72, 10, 204, "node", "line", 1, rx=2, layer="back"); d.rect(345, 140, 10, 104, "node", "line", 1, rx=2, layer="back")
    d.path([(70, 80), (204, 80)]); d.label(137, 66, "ticket, 10 min")
    d.path([(216, 148), (344, 148)]); d.label(280, 134, "signed call")
    d.path([(356, 176), (488, 176)]); d.label(422, 162, "render")
    d.path([(488, 208), (356, 208)], dash="5 4"); d.label(422, 194, "image")
    d.path([(344, 236), (216, 236)], "accent", width=1.4); d.label(280, 222, "hidden turn", "accent")
    d.path([(204, 268), (72, 268)], dash="5 4"); d.label(137, 254, "reply")
    heads = [("Browser", "Clerk session", False), ("Thread agent", "Durable Object", True), ("Convex", "tools, credits", False), ("Image models", "AI Gateway", False)]
    for x, (n, s, f) in zip(xs, heads): d.node(x - 56, 14, 112, 40, n, s, focal=f)
    d.node(164, 100, 92, 28, "You approve", kind="optional", size=10)
    d.text(372, 300, "Signatures expire in 5 min.", 8.5, "soft", MONO)
    return d

def gc_registry(th):
    d = D(th, "gc", "gc-model-registry", "Thirteen models, one registry",
          "Capability matrix of the eight image models: route, reference handling and supported sizes, with five chat models listed above.")
    d.eyebrow(24, 26, "Chat, 5")
    d.text(84, 26, "gpt-5.6-terra | claude-sonnet-5 | gemini-3.6-flash | grok-4.5 | kimi-k3", 9, "muted", MONO)
    d.raw(f'<line x1="24" y1="40" x2="536" y2="40" stroke="{d.c("rule")}" stroke-width="1"/>')
    cols = [(24, "Image, 8", "start"), (264, "Route", "start"), (336, "References", "start"), (440, "1K", "middle"), (476, "2K", "middle"), (512, "4K", "middle")]
    for x, s, a in cols: d.eyebrow(x, 58, s, a)
    rows = [("gemini-3.1-flash-image", "gateway", "inline", "111", "default"), ("gemini-3-pro-image", "gateway", "inline", "111", ""),
            ("gemini-3.1-flash-lite", "gateway", "inline", "100", ""), ("gpt-image-2.5-flare", "gateway", "url", "110", ""),
            ("gpt-image-2.5-sunburst", "gateway", "url", "110", ""), ("grok-imagine-image", "gateway", "url", "100", "no 4:5"),
            ("flux-2-max", "gateway", "url", "110", ""), ("ideogram-v4", "direct", "none", "010", "")]
    for i, (m, r, ref, sz, note) in enumerate(rows):
        y0 = 68 + i * 28
        d.raw(f'<line x1="24" y1="{y0}" x2="536" y2="{y0}" stroke="{d.c("rule")}" stroke-width="0.8"/>')
        d.text(24, y0 + 18, m, 10, "ink", MONO)
        if note: d.text(24 + len(m) * 6.2 + 8, y0 + 18, note, 9, "accent" if note == "default" else "soft", MONO)
        d.text(264, y0 + 18, r, 10, "accent" if r == "direct" else "muted", MONO)
        d.text(336, y0 + 18, ref, 10, "muted", MONO)
        for j, on in enumerate(sz):
            cx = 440 + j * 36
            if on == "1": d.rect(cx - 6, y0 + 8, 12, 12, "ink", None, rx=2)
            else: d.rect(cx - 6, y0 + 8, 12, 12, "paper", "rule", 1, rx=2)
    d.raw(f'<line x1="24" y1="292" x2="536" y2="292" stroke="{d.c("rule")}" stroke-width="0.8"/>')
    d.text(24, 308, "Brand context is added on every step: up to 32 rules, framed as data, not instructions.", 8.5, "soft", MONO)
    return d

def pr_fanin(th):
    d = D(th, "pr", "pr-one-status", "Every review agent, one status",
          "Fan-in of five review agents into one pull request status by precedence, which sends one notification per push.")
    d.eyebrow(24, 28, "checkout-web #214")
    agents = [("GitHub Actions", "12 check runs", "passed"), ("Vercel", "commit status", "passed"), ("Cursor Bugbot", "check + threads", "passed"),
              ("Devin", "review threads", "2 threads"), ("Codex", "review", "passed")]
    cys = [60, 102, 144, 186, 228]; attach = [96, 112, 128, 144, 160]; vx = [256, 244, 208, 220, 232]
    for cy, ay, x in zip(cys, attach, vx):
        focal = cy == 186
        d.path([(184, cy), (x, cy), (x, ay), (276, ay)], "accent" if focal else "muted", width=1.4 if focal else 1.1, r=6)
    d.path([(456, 176), (456, 212)])
    for (n, s_, st), cy in zip(agents, cys):
        focal = st != "passed"
        d.rect(24, cy - 16, 160, 32, "paper", None); d.rect(24, cy - 16, 160, 32, "tint" if focal else "node", "accent" if focal else "line", 1.25 if focal else 1)
        d.text(36, cy - 2, n, 10.5, "ink", SANS, 500); d.text(36, cy + 10, s_, 8.5, "soft", MONO)
        d.text(174, cy + 4, st.upper(), 7.5, "accent" if focal else "soft", MONO, 500, "end", "0.06em")
    d.rect(276, 80, 260, 96, "paper", None); d.rect(276, 80, 260, 96, "node", "line", 1)
    d.text(288, 102, "PR status", 11, "ink", SANS, 500); d.text(524, 102, "worst state wins", 8.5, "soft", MONO, 400, "end")
    x = 288
    for i, s_ in enumerate(["Failing", "Running", "Needs review", "Ready"]):
        focal = s_ == "Needs review"
        if focal:
            d.rect(x, 128, 80, 24, "tint", "accent", 1, rx=4)
            d.text(x + 40, 144, s_, 9.5, "ink", SANS, 500, "middle"); x += 80
        else:
            w = {"Failing": 34, "Running": 40, "Ready": 28}[s_]
            d.text(x, 144, s_, 9.5, "soft", SANS, 400); x += w
        if i < 3: d.text(x + 6, 144, "›", 10, "soft", SANS, 400, "middle"); x += 12
    d.node(376, 212, 160, 40, "Notify once per push", "follow-up on regression")
    d.text(24, 290, "\"Ready for your review. 2 open threads from Devin.\"", 9, "muted", MONO)
    d.text(24, 306, "The first poll only records a baseline, so launching the app never notifies.", 8.5, "soft", MONO)
    return d

def lf_launchie_loop(th):
    import math
    d = D(th, "lf", "lf-launchie-loop", "Launchie, the agent inside the iOS app",
          "Loop of a Launchie turn: you ask, it reads your data through tools, proposes a checked change, you approve on iOS, it applies and a nightly ledger measures outcomes; your own words and those outcomes are written back to seller memory, which the model never writes itself.",
          w=736, h=424)
    cx, cy, R, sw, sh = 368, 212, 150, 136, 44
    st = [("Ask", "you, in the app", False), ("Read your data", "17 MCP tools", False), ("Propose", "change set, checked", False),
          ("You approve", "MFA on iOS", True), ("Apply", "live re-check", False), ("Measure", "nightly ledger", False)]
    N = len(st); boxes = []
    for k in range(N):
        t = math.radians(-90 + k * 360 / N)
        x = round((cx + R * math.cos(t) - sw / 2) / 4) * 4; y = round((cy + R * math.sin(t) - sh / 2) / 4) * 4
        boxes.append((x, y))
    def inside(px, py, bx, by, pad=3): return bx - pad <= px <= bx + sw + pad and by - pad <= py <= by + sh + pad
    def pt(a): return cx + R * math.cos(a), cy + R * math.sin(a)
    for k in range(N):
        j = (k + 1) % N
        a0 = math.radians(-90 + k * 360 / N); a1 = math.radians(-90 + j * 360 / N) + (2 * math.pi if j == 0 else 0)
        a = a0
        while inside(*pt(a), *boxes[k]): a += 0.002
        e = a1
        while inside(*pt(e), *boxes[j]): e -= 0.002
        (x0, y0), (x1, y1) = pt(a), pt(e)
        focal = k == 2 or k == 3
        col = d.c("accent") if k == 2 else d.c("muted")
        d.back.append(f'<path d="M{x0:.2f} {y0:.2f} A{R} {R} 0 0 1 {x1:.2f} {y1:.2f}" fill="none" stroke="{col}" stroke-width="{1.4 if k == 2 else 1.2}" stroke-linecap="round"/>')
        tx, ty = -math.sin(e), math.cos(e)  # clockwise tangent
        nx, ny = -ty, tx
        p1 = (x1 - 7 * tx + 3.5 * nx, y1 - 7 * ty + 3.5 * ny); p2 = (x1 - 7 * tx - 3.5 * nx, y1 - 7 * ty - 3.5 * ny)
        d.back.append(f'<polygon points="{x1:.2f},{y1:.2f} {p1[0]:.2f},{p1[1]:.2f} {p2[0]:.2f},{p2[1]:.2f}" fill="{col}"/>')
    # write-back spokes (dashed) into the hub
    hx, hy, hw, hh = cx - 80, cy - 36, 160, 72
    bx, by = boxes[0]
    d.path([(cx, by + sh), (cx, hy)], dash="5 4"); d.label(cx - 40, by + sh + 16, "your words")
    bx5, by5 = boxes[5]; mx = bx5 + sw / 2
    d.path([(mx, by5 + sh), (mx, cy), (hx, cy)], dash="5 4"); d.label(mx - 34, (by5 + sh + cy) / 2 + 2, "outcomes")
    for k, (n, sub, focal) in enumerate(st):
        x, y = boxes[k]; d.node(x, y, sw, sh, n, sub, focal=focal)
    d.rect(hx, hy, hw, hh, "paper", None); d.rect(hx, hy, hw, hh, "fillTotal", "ink", 1, rx=8)
    d.text(cx, cy - 6, "Seller memory", 12, "ink", SANS, 500, "middle")
    d.text(cx, cy + 9, "facts, rules,", 9, "soft", MONO, 400, "middle"); d.text(cx, cy + 21, "track record", 9, "soft", MONO, 400, "middle")
    d.eyebrow(24, 32, "Every pass feeds memory")
    for i, line in enumerate(["gpt-5.6-terra", "10 steps, 120 s a turn", "27 tools, 10 its own"]):
        d.text(712, 32 + i * 14, line, 9, "soft", MONO, 400, "end")
    d.text(24, 404, "The model never writes memory. Rules come from your own words, the track record from the ledger.", 9, "soft", MONO)
    return d

ALL = [lf_launchie_loop, gc_image_quality, lf_fanout, lf_approval, lf_launchie_cloudflare, lf_layers, gc_sequence, gc_registry, pr_fanin]
if __name__ == "__main__":
    out = os.path.dirname(os.path.abspath(__file__))
    for f in ALL:
        for th in ("light", "dark"):
            d = f(th); open(os.path.join(out, d.slug + ".svg"), "w").write(d.svg())
    print("wrote", len(ALL) * 2)
