# FlashFX MVP

The MVP build of [FlashFX](https://flashfx.app), a browser-based motion design editor. It follows [FlashFX-Alpha](https://github.com/gabrielebolognese/FlashFX-Alpha) and adds the animation engine, a fuller timeline and sequences.

> This repository is kept for history. The current editor is [FlashFX-v2](https://github.com/gabrielebolognese/FlashFX-v2), live at [editor.flashfx.app](https://editor.flashfx.app).

## What is in it

- A design tool for shapes, text and images
- A timeline with an animation engine and sequences
- Export
- Accounts, projects, presets and animation favorites stored in Supabase
- An in-app tutorial

## Stack

React 18, TypeScript, Vite, Tailwind CSS and Supabase (auth, database and storage).

## Running it

```bash
npm install
npm run dev
```

The app needs a Supabase project. Apply the SQL in `supabase/migrations/` and provide the project URL and anon key as Vite environment variables.

## Notes

The Markdown files in the root (for example `EXPORT_SYSTEM_DOCUMENTATION.md`, `AUTHENTICATION_SYSTEM_DOCUMENTATION.md` and `TEXT_FEATURES_DOCUMENTATION.md`) document individual features as they were built.
