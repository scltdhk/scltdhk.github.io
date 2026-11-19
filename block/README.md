# BLOCKDOKU product page

Static GitHub Pages route: `/block/`. No build step, external fonts or service worker. Singular integration is prepared but disabled until account configuration is supplied.

## Store links
Both download links currently point to `https://www.google.com/` as requested. Both open a new tab with `target="_blank"` and `rel="noopener noreferrer"`. Replace `.store` hrefs in index.html when verified store links are available.

## Loading and cache updates
- Two media-specific hero preloads: mobile 960px, desktop 1584px. CSS uses the same exact URL as its matching preload.
- Gallery WebP images have 360/644px srcset candidates, lazy loading, async decoding and reserved dimensions.
- All images and CSS use content hashes in filenames. When an asset changes, generate a new hash and update HTML/CSS references. Never overwrite a hashed file with new bytes.
- HTML stays unversioned. GitHub Pages controls HTTP cache headers; this repository does not claim to set custom max-age or immutable headers.
- No service worker: browser/CDN caching remains native and page updates cannot be hidden behind an old offline cache.
- Retain previous hashed assets when publishing subsequent updates until prior HTML cache lifetimes have elapsed.
- No synthetic delay, scroll handler or animation library. The disabled Singular integration sends no tracking requests.

## Artwork
Hero and carved wordmark were produced with image_gen from the approved forest design. Other artwork comes from the project's icon, teak texture and promotional screenshots. These are promotional illustrations, not captures of real gameplay.

## Deployment
GitHub Pages builds main at repository root. Preserve CNAME and app-ads.txt. The company homepage includes a link to this product route.

## Wide-screen composition
The whole page is capped at 1200 CSS pixels and centered. Wider screens have full-height frosted gutters using a 540×360 crop (source x=170, y=220) of only the clean distant forest from the hero source. Both gutters use this same forest crop, excluding foreground branches, leaves, board and tabletop. Each gutter fits independently instead of enlarging the entire hero across the viewport. A static 4px blur softens foliage; there is no scroll script. The additional WebP is 2,160 bytes. Desktop typography stops scaling at the content boundary. Smaller screens retain their existing responsive layout. Previous hashed CSS is retained for cached HTML.

Buttons use a single 1px border, restrained wood grain, a 1px inset highlight and a short 2px side/contact edge instead of the previous stacked thick rims.

The download controls have an opaque gold fallback and no parent entrance fade. Texture downloads cannot expose the scene through the buttons. Gallery sizes now match the 1200px container limit (280px cards).

## Singular Web-to-App
See SINGULAR-SETUP.html for account setup, exact application parameters and device acceptance steps. singular-config.js contains public browser SDK configuration only; no account credentials have been supplied. enabled=false preserves all existing download behavior. Increment both script query versions when releasing changes. Run `node tests/block-singular.test.cjs` at repository root for offline contract/fallback checks (not real attribution validation).
