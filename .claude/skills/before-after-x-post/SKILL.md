---
name: before-after-x-post
description: Build an annotated before/after X (Twitter) post in Paper from a redesign — two real screens side by side on the X-post blue, white handwritten notes and arrows, avatar and project stickers — then export it and write the caption. Use when Hasaam wants to show off design work, capture a before and after, make a redesign post, or says "make a post like the Launch Fast iOS ones".
---

# Before/after X post

Reference posts: Paper file "iOS App" (`01M3QBRBYZYC6DG0HCNDVXN7N5`), page **X posts**: "X post | Home / Product page / Rank | Before and after". Screenshot one before starting so the look is fresh.

## 1. Pick the screens

- Ask which file/page holds the redesign, then screenshot each old screen next to its new one. In the iOS file the convention is: plain name = before, "(foundations)" = after.
- Rank pairs by how much a stranger *sees* change in one glance: broken things fixed (wrong axis, empty chart, clipped controls), hierarchy changes, structure changes (dock → sidebar). Skip pairs that only differ in mock data, or that are identical. Don't credit the redesign for different sample numbers.
- Recommend a top 3 with one line each, let Hasaam swap picks (Home rated strong, Payments weak last time).
- Before publishing, scan screens for real customer data, addresses, payout figures; confirm they're fake or swap them.

## 2. Build in the same Paper file as the screens

`x-paper-clone` only works inside one file, so add an **X posts** page to the file that holds the screens (or reuse it) and clone the real nodes. If a post artboard already exists in that file, `duplicate_nodes` it, delete the inner screens + notes, and reclone — far faster than rebuilding.

Canvas (phone screens 402×874):

| Element | Spec |
|---|---|
| Artboard | 2000×1125, `#0A84FF`, overflow clip, 80px gap between posts |
| Before phone | wrapper at left 460, top 186, 402×874, radius 48, overflow clip, shadow `#00000014 0 0 0 1px, #00143C1F 0 2px 6px, #00143C47 0 30px 80px`; clone inside at 0,0 |
| After phone | same wrapper at left 1140 |
| Labels | "before" at 468,98 / "after" at 1148,98 — Caveat 400 64px/72px, before at white 72%, after white |
| Avatar sticker | left 1830, top 22, 130×161, `rotate: 8deg`, bg `url(https://app.paper.design/file-assets/01M3MZDE6V4Z5WE7C6XCV0XTSN/0ZJ1MWM6SW2PBDEJ41CA9N9KCE.webp)` 100% 100%, `filter: drop-shadow(#0000002E 0 2px 2px) drop-shadow(#00143C38 0 12px 24px)` |
| Project sticker | left 96, top 930, 136×136, radius 30, `rotate: -7deg`, white bg, icon bg-size 62%, box-shadow `#00000012 0 0 0 1px inset, #FFFFFF 0 0 0 8px, #0000000D 0 0 0 8.5px, #00000014 0 1px 1px 8px, #00000012 0 3px 5px 7px, #0000000F 0 12px 22px 4px`. Launch Fast icon: `https://app.paper.design/file-assets/01M3MZDE6V4Z5WE7C6XCV0XTSN/6EG5G1Q4K58KZYDYARJENBTZ7Q.png`. Other project icons live on the Portfolio file's "X banner \| Sticker wall" (get_jsx a sticker for its URL). |

Zones for notes: left margin x 0–460 (about the before screen), middle gap x 862–1140 (right side of before / left side of after), right margin x 1542–2000 (about the after screen). Keep the top-right clear for the avatar and bottom-left for the project sticker.

For desktop/web screens, keep the same canvas and labels but scale the screenshots to fit (e.g. two 720px-wide frames stacked or side by side) and keep notes in the outer margins.

### Clone gotchas — always screenshot right after cloning

Clones can turn children of non-flex frames into `position: absolute`, so content collapses or overlaps. Seen so far:
- Metric strip overlapping the chart → set the strip frame `display: flex; flex-direction: column` and give its child an explicit width (354px).
- Chart peak callouts ("$74" pills) collapsing into dashes → set each "Peak callout" frame `display: flex`.
Compare against the original artboard; nothing else on the screens should change.

## 3. Notes and arrows

Copy voice: **short and dry, lowercase**, 2–5 words, like a designer's margin notes. State the change, not the benefit: "ASIN as the title", "axis read $1, $0, $0", "plot the second series", "sidebar, not a dock", "filters, not Edit", "TACOS over orders". Notes about the before name the problem; notes about the after name the fix. 7–9 notes per post. Never use "·" (use a comma or line break).

Arrows are white, so **they must end 8–12px outside the white phone**, pointing at the row they mean (white on white vanishes). Things near the inner edges get notes in the middle gap.

Generate notes + arrows with the script (positions in artboard px, measured from a screenshot of the post):

```bash
python3 .claude/skills/before-after-x-post/scripts/notes.py spec.json
```

See the docstring for the spec format (`side` L/R/M, `top`, `target`, optional `bend`). Paste the output into `write_html` (insert-children on the artboard), a few notes per call. Then screenshot and fix: text running into an arrow (shift `left`), text touching a phone edge, notes crowding a sticker (move the note, regenerate its arrow with `mode: replace`).

## 4. Export

- `export` each artboard as PNG at **2x** → 4000×2250, ~1 MB, inside X's 4096px / 5 MB limits.
- Move to `~/Desktop`, named in posting order: `1 <Project> - <Screen>.png`.
- Call `finish_working_on_nodes` when done.

## 5. Captions and posting

- One image per post, posted on separate days (a 3-image grid crops 16:9 images and hides the notes). If it should all go out at once, use a self-reply thread.
- Caption: slightly cheery, one line telling a stranger what the screen is for and who it's for. Don't say "redesign", "part 1", or explain what the notes say — the image does that. At most one emoji. Example (Rank): "is your ad spend paying off? rank tracker shows if you're climbing on amazon and if organic sales are following 📈". The first post of a series introduces the product in plain words ("launch fast is the app amazon sellers use to check on their store from their phone").
- Timing: ~10am Eastern (Toronto time), Tue/Wed/Thu in a row, broad screen first then deeper ones. No links in the main post; reply with one if needed.
