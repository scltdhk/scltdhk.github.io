# Review and performance measurements — 2026-11-19

## Changes
- Converted hero, carved logo, texture and gallery to WebP, with desktop/mobile hero and responsive gallery sizes.
- Total asset files: 6,972,345 → 928,758 bytes (the old total included an unused 541,850-byte hero). Previously used images alone were 6,430,495 bytes.
- Media-specific preload uses the same hero URL as CSS; gallery uses lazy loading and async decode.
- Content-hashed CSS/images allow native browser/CDN cache reuse and safe asset updates. HTTP cache headers remain controlled by GitHub Pages.
- Removed unused hero and script, obsolete title CSS; disabled hover transforms on touch devices. No runtime JavaScript or extra third-party requests.

## Controlled local comparison
Chromium, 390 × 844 CSS pixels, device scale factor 1, cache disabled; simulated 1.6 Mbps download, 0.8 Mbps upload, 150 ms latency. One navigation per variant, including network idle; not a field percentile or an iPhone measurement.

| Metric | Before | After |
| --- | ---: | ---: |
| Largest contentful paint | 32,572 ms | 1,932 ms |
| First contentful paint | 488 ms | 480 ms |
| Load event | 32,563 ms | 2,066 ms |
| Resource transfer bytes | 6,500,014 | 350,555 |
| Cumulative layout shift | 0 | 0 |

Transfer includes images selected by the browser and favicon, excludes the HTML navigation response. Lazy-load distance is browser-dependent: all four gallery images were fetched in this run despite lazy hints.

## Layout checks
320, 390, 640, 768, 1024, 1440 and 1920px: no horizontal overflow, no broken images, both download destinations remain https://www.google.com/. Mobile buttons are at least 140 × 52px. Stable-state screenshots reviewed at desktop and phone widths. Reduced-motion and keyboard focus verified previously and retained.

This is a close implementation of the approved mockup, not a pixel-identical reconstruction. Existing promotional screenshots are reused; they are not actual Unity gameplay captures.
