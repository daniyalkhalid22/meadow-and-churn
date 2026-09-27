# Meadow & Churn

Meadow & Churn is a polished, single-page marketing site for a fictional boutique dairy supplier. It presents the brand story, a small-batch product shelf, farm and sourcing practices, customer notes, and a demo-only order request flow.

## Overview

The site is intentionally editorial rather than ecommerce-heavy: it uses a warm paper palette, meadow greens, clay accents, restrained type, and small illustrated forms built with CSS and inline icons. The page is responsive from mobile through wide desktop layouts and includes hover states, soft entrance motion, an adaptive navigation menu, and RTL-aware Urdu presentation.

## Stack

- Vite and React with TypeScript
- Tailwind CSS through the existing `@tailwindcss/vite` plugin
- Lucide React for interface icons
- No API, database, external image service, or new dependency
- JSON locale data in `src/locales/`

## Translation system

`src/js/localization.ts` is the isolated, framework-light translation module. English and Urdu JSON files are imported as the local message catalog, with English as the fallback for missing keys. The `useLocalization` hook:

- exposes `t(key, vars)` and an instant locale switcher;
- persists the selected locale under `meadow-churn-locale`;
- sets `html[lang]`, `html[dir]`, `document.title`, and the meta description;
- translates inspectable `[data-i18n]` DOM elements and attribute values declared with `data-i18n-attr`;
- guards rapid toggles with a sequence and restores the pre-switch scroll position.

Before the hook effect completes, React renders the English catalog synchronously, so the page remains usable and never displays an undefined translation. Product, form, validation, success, navigation, footer, and metadata strings are all represented in both catalogs.

### Adding a third language

1. Add a matching JSON catalog at `src/locales/<code>.json` using the same key structure.
2. Add the code to `supportedLocales`, the `localeCache`, and `getInitialLocale` in `src/js/localization.ts`.
3. Add a locale button in `App.tsx`.
4. If the language is RTL, include it in the `root.dir` condition; otherwise it will use LTR.
5. Keep the same `data-i18n` keys in the rendered DOM. Missing entries automatically fall back to English.

## Edge cases tested and fixed

- Missing Urdu entries resolve to the English value rather than blank text.
- Long translated names and descriptions use wrapping and overflow-safe card typography.
- Switching language while scrolled captures and restores `window.scrollY`.
- Rapid clicks are sequence-guarded so stale animation frames cannot leave mixed DOM content.
- Initial English render provides usable labels before locale effects run, and `index.html` includes a useful English loading state if JavaScript is slow to execute.
- The form validates required contact fields and email syntax, then shows a translated success confirmation.

## Known limitations

The order flow is deliberately a client-only demonstration. It does not send email, reserve inventory, process payment, or write to a server. The Instagram footer link is an in-page placeholder because the brand is fictional. Locale JSON is bundled at build time rather than fetched over a network.

## Future improvements

An eventual production version could connect the form to a secure order endpoint, add delivery-zone selection and inventory-aware availability, load locale bundles on demand, add product photography, and provide a content-managed sourcing journal.