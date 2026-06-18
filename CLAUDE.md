# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository status

**No code exists yet.** This repository currently contains only design assets (images, fonts) and a
technical spec (`техническое_задание.md`) for a one-page wedding invitation website.

**Stack decision: plain HTML + CSS + JS — no framework, no bundler, no build step.** Do not introduce
npm, webpack/vite, React, TypeScript, etc. Write `index.html`, `.css`, and `.js` files directly and
reference assets with relative paths.

## Running the site

There is no build step. Open `index.html` directly in a browser, or serve the folder with any static
file server (e.g. `npx serve .` or VS Code "Live Server") to avoid `file://` quirks with relative
asset paths and fetch/animation timing.

## Source of truth

`техническое_задание.md` (Russian) is the authoritative spec — read it in full before building or
modifying any block. It describes content, images, fonts, and colors block-by-block. The summary
below is for orientation only; defer to the spec file for exact wording and image filenames.

## Site structure

Single-page, mobile-first, vertically scrolling invitation made of 6 blocks. Every block shares
background color `#fdf1e5` and primary text color `#55402d`. A falling-petals animation should play
on block 1 continuously, and should also trigger on scroll into each subsequent block.

Assets are organized one folder per block: `картинки_1_блока` ... `картинки_6_блока`, plus a
currently-empty `абстрактные_картинки` folder reserved for additional decorative assets. Image
filenames referenced in the spec map directly to files in these folders (e.g. `молодожены.jpg`,
`обрыв.png`, `сердце.png`).

Block overview (see spec for exact copy/layout):
1. **Hero** — bride/groom photo (`молодожены.jpg`) over a cliff graphic (`обрыв.png`), names "Олег и Настя", welcome text, "ДЕНЬ НАШЕЙ СВАДЬБЫ" — falling petals animation.
2. **Date & place** — "Дата и место" heading, venue "Гостевой комплекс «Утес»", address "пос. Синий Утес 61".
3. **Timing** — "Тайминг нашего дня", schedule image (`расписание.png`).
4. **Dress code** — "Дресс-код", "нежное настроение", clothing image; one decorative flower image is rotated 90° counter-clockwise.
5. **Wishes** — "Пожелания", gift/money note, flowers note.
6. **Countdown / RSVP** — "Мы ждем вас!" countdown timer to **2026-08-22 15:00 Tomsk time**, RSVP deadline **2026-08-08**, organizer contacts (Алина +7 999 177 91 52, Александра +7 913 868 00 62) as tap-to-call links; one decorative flower image rotated 90° clockwise.

## Typography rules

Three font families live under `Шрифты/`, each with a specific role — do not substitute or mix them:

- **Cormorant Garamond** (`Шрифты/Cormorant Garamond (заголовки)/`) — section heading words (e.g. "Олег", "Настя", "Дата", "Место", "Тайминг", "Дресс-код", "Пожелания").
- **Marianna** (`Шрифты/Marianna (курсив)/marianna.ttf`) — cursive/script accent words, notably the "и" between names, and secondary heading lines like "нашей свадьбы", "нежное настроение", "через...".
- **EB Garamond** (`Шрифты/EB Garamond (основной)/`) — body copy; bold weight for short emphasis headings in caps (e.g. "ЛЮБИМЫЕ НАШИ", "МЕСТО ПРОВЕДЕНИЯ", "ПОДАРКИ", "ЦВЕТЫ"), regular weight for paragraph text.

Default text color across all custom fonts is `#55402d` unless the spec says otherwise.

## Conventions to follow when implementing

- Build mobile-first; desktop is secondary per the spec ("сайт преимущественно будет использоваться в мобильной версии").
- Reuse the same `сердце.png` (heart) and `Полоска центр 1.png` (divider) assets across blocks as specified rather than duplicating them.
- Decorative flower/leaf images are sometimes rotated (90° CW or CCW) per block — apply rotation via CSS transform rather than re-exporting rotated image files.
- Phone numbers for organizers must be rendered as `tel:` links.
