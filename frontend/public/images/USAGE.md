# Image assets: intended usage

Recorded so the later crop and aspect-ratio work does not have to rediscover how
each file is consumed. Add a row whenever you add an image.

Roles and their size budgets, derived from measured render sizes rather than
round numbers:

| Role | Largest measured render | Source cap |
|---|---|---|
| `full-bleed` | 1265x688 CSS at a 1280 viewport (hero slide, page hero, full-width band) | 1920px wide |
| `card` | 277x100 CSS on mobile menu cards, 384x300 gallery tile | 840px wide |
| `fixed` | Dictated by a protocol or manifest, not by layout | exact |

The mobile menu card is the binding constraint for `card`, not the 80x80 desktop
thumbnail. It renders a 277px-wide banner, so 840px covers it to roughly 3x.

## Photography

| File | Role | Used by |
|---|---|---|
| `jollof_rice.webp` | full-bleed | Hero slide 2, About page hero, Home band, Gallery tile, Menu, bundleRecommender |
| `efo_riro.webp` | full-bleed | Hero slide 1, Home band, Gallery tile, Menu, Gallery onError fallback |
| `peppersoup.webp` | full-bleed | Hero slide 3, Menu |
| `barbecue.jpg` | full-bleed | Hero slide 4, Reservation hero, PlanPicnic, Home bundle card |
| `Egusi.webp` | full-bleed | Home band, Gallery tile, Menu |
| `Ofada.webp` | full-bleed | Home band, Gallery tile, Menu |
| `grilled_suya.jpg` | full-bleed | Contact page background |
| `Amala.webp` | card | Gallery tile |
| `boli.webp` | card | Gallery tile, Menu |
| `White_Rice.webp` | card | Menu (Coconut Rice) |
| `Friedrice.webp` | card | Menu |
| `ogbono.webp` | card | Menu |
| `banga.webp` | card | Menu |
| `suya.webp` | card | Menu (Beef Suya) |
| `beef-shawarma.webp` | card | Menu |
| `Akara.webp` | card | Menu |
| `Coleslaw.webp` | card | Menu |
| `ChickenShawarmaWrap.webp` | card | Menu, bundleRecommender |
| `recipe_book.webp` | card | RecipeBook page |
| `grilled-chicken.webp` | card | Menu. **Under budget at 200x300**, see Missing below |

## Fixed-format assets

These stay in their current format on purpose.

| File | Role | Why it is not WebP |
|---|---|---|
| `og-honeyspice.png` | fixed 1200x630 | Social share card. WebP support across link crawlers is unreliable, and the dimensions are declared in `og:image:width` / `og:image:height`. |
| `icon-192.png` | fixed 192x192 | PWA manifest icon. |
| `icon-512.png` | fixed 512x512 | PWA manifest icon. |

`barbecue.jpg` and `grilled_suya.jpg` also remain JPEG, but for a different
reason: both were already efficiently encoded, and every WebP re-encode tried
came out larger. See the note below.

## Why some files were left alone

Re-encoding is only worth doing when it produces a smaller file. Three assets
were measured and rejected:

| File | Original | Best WebP attempt |
|---|---|---|
| `grilled_suya.jpg` | 314,610 | 329,264 |
| `barbecue.jpg` | 72,297 | 96,338 |
| `beef-shawarma.webp` | 22,810 | 25,450 |

Grilled meat and rice grain are high-frequency textures that WebP handles worse
than an already-tight JPEG at these quality levels. Re-encoding them would have
cost bytes and a generation of quality for nothing.

## Below budget

`grilled-chicken.webp` is 200x300, the only source available. It is used at
native size rather than upscaled, which is fine for the 80x80 desktop thumbnail
but stretches about 1.4x on the 277px-wide mobile card. A larger original,
roughly 1200px, would fix it with no code change: replace the file and rerun the
conversion.
