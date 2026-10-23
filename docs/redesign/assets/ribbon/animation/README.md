# Ribbon preview loops

`scene.html` is a 1:1 macOS desktop with live HTML windows (so content reflows when Ribbon resizes them), animated frame by frame. Scenes: `scroll`, `resize`, `pair`, `stack`, `overview`; themes: `light`, `dark` (`?scene=pair&theme=dark`). Geometry follows the app: 12 pt gaps, focus scrolls only as far as the window needs, overview panel at 120 per column + 24, presets ⅓ ½ ⅔ ¾ full.

    node render.mjs pair dark     # 30 fps PNG frames into frames-pair-dark/ (needs playwright)
    ffmpeg -framerate 30 -i frames-pair-dark/%04d.png -vf "scale=out_color_matrix=bt709:out_range=tv,format=yuv420p" \
      -c:v libx264 -preset slow -crf 20 -color_primaries bt709 -color_trc bt709 -colorspace bt709 -color_range tv \
      -movflags +faststart -an pair-dark.mp4

Frame 0 is the preview's still (`<scene>[-dark].webp`, WebP q92). Ship re-renders under new file names: `/work` is cached for a day.
