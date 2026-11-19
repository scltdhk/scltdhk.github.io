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

## Follow-up: brighter buttons and clean forest gutters
Changed image variants total 942,290 → 648,408 bytes (31.2% smaller). Previous hashed files remain for cached HTML and are not loaded by the new page. Original sources were used for WebP recompression. Wordmark reduced to 1100px; gallery retains 360/644 variants. Side crop excludes near branches and drops from 30,368 to 2,160 bytes.

Same local Chromium session, 390×844, DPR 1, cache disabled, 200,000 bytes/s download, 150ms latency; one run per version:

| Metric | Previous version | This version |
| --- | ---: | ---: |
| LCP | 1408 ms | 976 ms |
| Load event | 2082 ms | 966 ms |
| Resource transfer | 352359 bytes | 271779 bytes |
| CLS | 0 | 0 |

These are controlled single-run measurements, not field statistics or physical iPhone results. Checked 390/1440/2560 widths for overflow. Tested with image requests blocked: CTA retains an opaque gold base and its parent has no entrance fade. New-tab link attributes remain intact.
