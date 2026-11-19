# BLOCKDOKU product page

Static GitHub Pages route: `/block/`. No build step, external fonts, JavaScript or service worker.

## Store links
Both download links currently point to `https://www.google.com/` as requested. Replace `.store` hrefs in index.html when verified store links are available.

## Loading and cache updates
- Two media-specific hero preloads: mobile 960px, desktop 1584px. CSS uses the same exact URL as its matching preload.
- Gallery WebP images have 360/644px srcset candidates, lazy loading, async decoding and reserved dimensions.
- All images and CSS use content hashes in filenames. When an asset changes, generate a new hash and update HTML/CSS references. Never overwrite a hashed file with new bytes.
- HTML stays unversioned. GitHub Pages controls HTTP cache headers; this repository does not claim to set custom max-age or immutable headers.
- No service worker: browser/CDN caching remains native and page updates cannot be hidden behind an old offline cache.
- Retain previous hashed assets when publishing subsequent updates until prior HTML cache lifetimes have elapsed.
- No synthetic delay, scroll handler, animation library or tracking script.

## Artwork
Hero and carved wordmark were produced with image_gen from the approved forest design. Other artwork comes from the project's icon, teak texture and promotional screenshots. These are promotional illustrations, not captures of real gameplay.

## Deployment
GitHub Pages builds main at repository root. Preserve CNAME and app-ads.txt. The company homepage includes a link to this product route.

## Wide-screen composition
The whole page is capped at 1200 CSS pixels and centered. Above that width, short same-scale reflected edge strips follow each section and fade out quickly into a quiet surrounding color. A slight 4px blur softens the forest boundary; there is no enlarged viewport-cover image or scroll script. Desktop typography stops scaling at the same boundary. Smaller screens retain their existing responsive layout. Previous hashed CSS is retained for cached HTML.

Buttons use a single 1px border, restrained wood grain, a 1px inset highlight and a short 2px side/contact edge instead of the previous stacked thick rims.
