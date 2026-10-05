# ARA FINANCIAL ALCHEMY — SEPARATED LAYERS

## Layer 1 — HTML
index.html

## Layer 2 — CSS
css/01-base.css
css/02-motion.css
css/03-responsive.css
css/04-performance.css

## Layer 3 — JavaScript
js/app.js
js/performance.js
js/lead.js

## Layer 4 — Data / Backend
data/Code.gs

## Layer 5 — Assets
assets/

Setiap layer dapat dikembangkan terpisah tanpa mencampur struktur HTML, styling,
animasi, logic, dan backend.


## Performance optimization v2
- Embedded logo converted to a smaller WebP asset.
- Duplicate header scroll listener removed.
- Below-the-fold sections use `content-visibility:auto`.
- Expensive decorative blur/backdrop-filter/continuous animations disabled by the performance profile.
- Visual structure/content is unchanged.
