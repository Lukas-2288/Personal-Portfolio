---
title: GoDiscover
kind: Personal project
role: Solo developer
dates: Feb–Jul 2026
sortDate: 2026-07-31
summary: GoDiscover is a cross-platform app for discovering movies, books, music artists and albums. Most recommendation feeds keep narrowing toward what you already like. GoDiscover starts the other way round, with no filters and no personalization, and only tailors picks when you ask. It's built with React Native (Expo), TypeScript and Supabase.
blurb: A swipe-to-discover app for movies, books, artists and albums, built from one TypeScript codebase for iOS, Android and the web.
metrics:
  - value: "460"
    label: automated tests
  - value: "3"
    label: "platforms from one codebase: iOS, Android, web"
  - value: "4"
    label: "data sources: TMDB, Open Library, Discogs, Last.fm"
tags:
  - React Native
  - Expo Router
  - TypeScript
  - React Native Web
  - Supabase
  - Reanimated
  - Jest
featured: true
diagram: card-deck
---

### How it works

- Pick a category and swipe through a deck of cards: right to save, left for "Not for me." Every swipe also has a labeled button, so the app works without gestures.
- There are several ways to start a deck:
  - **Surprise Me:** random, with no filters.
  - **What's New:** recent releases.
  - **Underground:** lesser-known musicians, picked by listener count.
  - **Search & Filters:** genre, era, rating, runtime, page count, release type and more.
- **Similar** opens a clearly labeled, temporary deck based on one item. It widens step by step (close → adjacent → loose → wander), and each card shows which step it came from, so it doesn't repeat the same few results.
- **"Not for me" is remembered.** Rejected items stay out of future decks and their genres show up less. A mis-tapped skip can be undone.
- After you save something, you choose whether the next cards should be **More like this** or **Something different**.
- Saved items are grouped by category and sync across devices once you have an account. Any saved item can start a new Similar deck. You never need an account just to browse.

### Engineering highlights

- **One codebase, three platforms.** Expo Router and React Native Web build iOS, Android and web from shared TypeScript. Layouts differ where it matters: a bottom sheet on phones, a centered panel on desktop.
- **Four data sources, one content model.** Results from TMDB, Open Library, Discogs and Last.fm are converted into one shared format. Each source gets its own rules. For example, What's New uses a 120-day window with a lower minimum vote count for films, and a publication-year range for books, because one rule for all four gave poor results.
- **Logic separated from the UI.** Deck state, request routing and the Similar steps are pure, unit-tested functions. All network and storage calls go through one controller, separate from the UI.
- **Auth and data security.** Sign-in uses Supabase Auth (email and password, or Google), and the database uses PostgreSQL Row-Level Security. Each save or undo stays tied to the account that started it, so switching accounts mid-action can't change the other account's data.
- **Accessibility.** Light and dark themes with WCAG AA color contrast checked in tests, full reduced-motion support, and touch targets of at least 44px.
- **Performance.** API requests are cached and deduplicated, artwork loads at thumbnail size, and a slimmed-down Supabase client cut about 100 KB from the web bundle.
- **Testing.** 460 automated tests in Jest, strict TypeScript, and recorded API responses so tests don't depend on live services. A custom responsive audit checks every screen at six phone, tablet and desktop sizes. It found 55 layout problems, all now fixed.
