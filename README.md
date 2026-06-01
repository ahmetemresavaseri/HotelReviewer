# Amara Comfort Resort — Gästebewertung

Mobile-first guest review subpage for Amara Comfort Resort, implemented from the
Claude Design handoff bundle. Brand: gold accent `#aa8453`, Helvetica Neue Light,
white logo on a dark hero, `it's your world!` script tagline.

## Flow

1. **`index.html`** — *Anmeldung / Über Ihren Aufenthalt*. The guest enters
   Name, Zimmernummer and Geburtsjahr. On submit the details are stored in
   `localStorage` and the guest is redirected to the review page.
2. **`review.html`** — *Bewertung* (layout variant C). Sticky live-score banner,
   8 star-rated areas (Gesamteindruck, Zimmer & Sauberkeit, Service & Personal,
   Essen & Getränke, Strand & Pool, Preis-Leistung, Spa & Wellness, Lage), a free
   *Weiteres Feedback* textbox, and a thank-you confirmation after submitting.

## Features

- **Four languages** switchable in the hero: Türkçe / English / Deutsch / Русский
  (selection persisted in `localStorage`).
- **Mobile-first**: single-column cards, ≥44px star touch targets, full-width
  submit button, numeric keypad for the room field; a 2-column grid kicks in from
  600px upward.
- The review page greets the guest by the name captured on the intro page.

## Assets

- `assets/brand.css` — shared brand system (colors, type, form + star styles).
- `assets/review.js` — i18n strings, star interaction, live score, navigation.
- `assets/logo-white.png` — white resort logo for the dark hero.

## Running

Static site — serve the folder and open `index.html`, e.g.:

```sh
python -m http.server 8000
```

## Backend

Submissions are sent to a **Google Sheet** via a Google Apps Script web app —
no server or hosting required. Each review becomes one row (guest details, the 8
star ratings, average, feedback, language, timestamp). Setup takes ~5 minutes:
see [`BACKEND.md`](BACKEND.md). Until the `ENDPOINT` URL is filled in
[`assets/review.js`](assets/review.js), the form works but stores nothing.
