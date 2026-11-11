# FlashFX MVP

The MVP build of FlashFX, a motion design editor that runs entirely in the browser. You draw shapes, text, lines and images on a canvas, animate their properties with keyframes on a timeline, and export the result as images or as a rendered video. Projects, presets and accounts are stored in Supabase, and a guest mode lets you use the editor without signing in. It is aimed at people who want to build short UI and motion graphics animations without a desktop tool.

> This repository is kept for history. It follows [FlashFX-Alpha](https://github.com/gabrielebolognese/FlashFX-Alpha) and is superseded by [FlashFX-v2](https://github.com/gabrielebolognese/FlashFX-v2).

## Features

### Canvas and design tools

- Element types: rectangle, circle, star, line (with triangle, circle, bar and diamond arrowheads), text, image, SVG, gradient, adjustment layer and group, plus ready-made UI pieces (button, chat bubble, chat frame).
- Layers panel with four tabs: Layers, Media, AI and Presets.
- Properties panel with separate tabs for shapes, text, lines and images, and an FX shortcuts tab.
- Grouping and ungrouping, duplicate, select all, nudge with the arrow keys, canvas and layer context menus.
- Configurable grid, snapping with visual snap guides, and zoom from 25% to 300%.
- Undo and redo history, and a clipboard for copying elements.
- Canvas background built from stacked linear or radial gradient layers with colour stops and blend modes.
- Materials for shapes (matte, glossy, metallic, glass, neon, holographic, plastic) with shadow and glow effects.
- Text settings including font size, letter spacing and an advanced text panel; a built-in list of Google Fonts plus custom fonts.
- Per-user default shape settings and an editor settings dialog.

### Images

- Import images from disk into a media pool stored in the browser (IndexedDB), with rename, delete and metadata dialogs.
- Image search through the Google Custom Search API and image generation through the OpenAI images API (DALL-E 3).
- Image adjustments: brightness, contrast, exposure, gamma, temperature, tint, vibrance, saturation, hue, lightness, grayscale, invert, sepia, three-way colour balance, levels, RGB channels, gaussian blur and motion blur, with a WebGL filter path.

### Animation

- Keyframe animation engine with one track per property. Animatable properties: x, y, width, height, rotation, opacity, fill, stroke, stroke width, border radius, scale X, scale Y, shadow blur, shadow X, shadow Y, font size and letter spacing.
- Easing functions: linear, ease, ease-in/out, quadratic, cubic, cosine, exponential, circular, elastic, back and bounce, with Bezier handles on keyframes and an interpolation graph.
- Two timelines: a general timeline of clips and an animation timeline of keyframes, separated by a resizable splitter.
- Clip operations: rename, duplicate, speed and duration, delete all keyframes, delete; lock and mute per clip.
- Timeline markers with names and colours, snap to markers, loop playback.
- Sequences with a frame rate of 24, 25, 30, 60 or 120 fps and a set duration.
- Animation favorites saved per user.

### Layout modes

- Three workspace layouts: Design, Edit and Advanced, switched from the layout bar.

### AI chat

- An AI tab that sends a prompt through a three-step OpenAI Assistants pipeline (validation, high-level shape plan, low-level shape definitions) and adds the generated elements to the canvas. Chat history is kept in local storage.

### Projects and storage

- Home page with a project list, previews, and new, load, rename and delete actions.
- Cloud projects in Supabase with per-user storage tracking (100 MB default limit) and a storage indicator.
- Project files in a `.ffxproj` format (a ZIP with a manifest, canvas, shapes, keyframes, properties and assets) that can be downloaded and loaded again.
- Preview auto-backup every 60 seconds, with a local fallback for guests.
- A JSON editor for the whole project and for single elements, built on Monaco with schema validation.
- Reusable presets, stored in Supabase for signed-in users and in local storage for guests.

### Export

- Export Design: the whole canvas as PNG or JPEG, at the project size, Full HD, 4K or a custom resolution.
- Export selection, export each shape as a PNG in a ZIP, and export stacked layers as a ZIP.
- Render Sequence: frame-by-frame rendering of the active sequence to video through `MediaRecorder` (WebM with VP9 or VP8, falling back to MP4 where the browser supports it), with progress and cancel.

### Accounts

- Supabase auth with email and password, username sign-in, and Google and GitHub OAuth.
- Password strength check on sign-up, profile avatars in a Supabase storage bucket.
- Guest mode, enabled by default on first load.

### Onboarding

- A 13-step in-app tutorial with a welcome dialog, overlay and panel.

## Getting started

### Prerequisites

- Node.js and npm. The project uses Vite 5, which needs Node.js 18 or newer.
- A Supabase project (for accounts, cloud projects, presets and favorites).
- Optional: an OpenAI API key for the AI chat tab.

### Download

```bash
git clone https://github.com/gabrielebolognese/FlashFX_MVP.git
cd FlashFX_MVP
```

### Install dependencies

```bash
npm install
```

### Configuration

Create a `.env` file in the project root (it is git-ignored) with these variables:

| Variable | Required | Purpose |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | Yes | URL of your Supabase project |
| `VITE_SUPABASE_ANON_KEY` | Yes | Anon key of your Supabase project |
| `VITE_OPENAI_API_KEY` | No | OpenAI key used by the AI chat pipeline |

There is no `.env.example` in the repository. Without the Supabase variables the app logs an error and falls back to a placeholder client, so only guest features work.

Then apply the SQL files in `supabase/migrations/` to your Supabase project, in filename order. They create the `profiles`, `projects`, `presets`, `project_files` and `animation_favorites` tables and the `project-previews` and `avatars` storage buckets. Google and GitHub sign-in also need those providers enabled in the Supabase dashboard.

### Run in development

```bash
npm run dev
```

Vite prints the local URL to open in the browser.

## Build and deploy

```bash
npm run build
```

The production build is written to `dist/`. It is a static single-page app, so `dist/` can be served by any static host. Routing uses the URL hash (`#/home`, `#/auth`, `#/editor`), so no server rewrite rules are needed. The repository contains no deployment configuration or CI workflow.

To check the production build locally:

```bash
npm run preview
```

## Usage

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Builds the production bundle into `dist/` |
| `npm run preview` | Serves the built bundle locally |
| `npm run lint` | Runs ESLint over the project |

### Routes

| Hash route | Screen |
| --- | --- |
| `#/home` | Project list (default) |
| `#/auth` | Sign in and sign up |
| `#/editor?project=<id>` | The editor, optionally opening a cloud project |

### Working in the editor

1. Open the app, create a project from the home page and enter the editor.
2. Add elements from the shapes bar or with the keyboard shortcuts below.
3. Adjust them in the properties panel; manage order and visibility in the Layers tab.
4. Create a sequence, then add keyframes to element properties on the animation timeline.
5. Open the export dialog to export the design, the layers, or render the sequence to video.
6. Save the project to the cloud, or download it as a `.ffxproj` file.

### Keyboard shortcuts

| Key | Action |
| --- | --- |
| `Q` / `W` / `E` | Add rectangle / circle / text |
| `R` / `T` / `Y` | Add button / chat bubble / chat frame |
| `U` | Add line |
| `I` | Upload image |
| `G` | Toggle grid |
| `+` / `-` | Zoom in / out |
| `Esc` | Deselect |
| Arrow keys | Nudge by 1 px (`Shift` for 10 px) |
| `Delete` / `Backspace` | Delete selection |
| `Ctrl+Z` / `Ctrl+Shift+Z` or `Ctrl+Y` | Undo / redo |
| `Ctrl+D` | Duplicate |
| `Ctrl+G` / `Ctrl+Shift+G` | Group / ungroup |
| `Ctrl+A` | Select all |
| `Ctrl+E` | Export |
| `Ctrl+;` | Toggle snapping |

On macOS, `Cmd` works in place of `Ctrl`.

## Project structure

| Path | Contents |
| --- | --- |
| `src/App.tsx`, `src/main.tsx` | Entry point and hash router |
| `src/pages/` | Home (projects), auth and login pages |
| `src/components/UIDesignTool.tsx` | Root component of the editor |
| `src/components/design-tool/` | Canvas, elements, layers panel, toolbar, AI chat, media pool, presets, JSON editors |
| `src/components/layout/` | Layout modes, properties tabs, material and background panels |
| `src/components/timeline/` | General and animation timelines, clip and marker dialogs |
| `src/components/animation/` | Keyframe editor and interpolation graph |
| `src/components/sequence/` | Sequence creation and compositor |
| `src/components/image/` | Image import, search, generation and filters |
| `src/components/modals/`, `auth/`, `tutorial/`, `storage/` | Dialogs, sign-in forms, tutorial and storage indicator |
| `src/animation-engine/` | Animation state, interpolation, easing and playback |
| `src/export/` | Image, ZIP and video exporters and the export dialog |
| `src/services/` | Supabase, project file, media pool, preset, storage, backup and OpenAI services |
| `src/hooks/`, `src/contexts/`, `src/utils/`, `src/types/` | Hooks, auth and tutorial contexts, helpers and type definitions |
| `supabase/migrations/` | SQL migrations for tables, policies and storage buckets |

## Tech stack

- React 18 and TypeScript
- Vite 5
- Tailwind CSS, PostCSS and Autoprefixer
- Supabase (`@supabase/supabase-js`) for auth, database and storage
- Monaco Editor and Ajv for the JSON editor and schema validation
- html-to-image, JSZip and file-saver for export
- lucide-react for icons
- Browser APIs: Canvas, WebGL, MediaRecorder and IndexedDB
- ESLint with typescript-eslint

## Further documentation

The Markdown files in the repository root document individual features as they were built:

- [EXECUTIVE_SUMMARY.md](EXECUTIVE_SUMMARY.md)
- [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md)
- [EXPORT_SYSTEM_DOCUMENTATION.md](EXPORT_SYSTEM_DOCUMENTATION.md)
- [AUTHENTICATION_SYSTEM_DOCUMENTATION.md](AUTHENTICATION_SYSTEM_DOCUMENTATION.md)
- [AUTHENTICATION_FIX_IMPLEMENTATION.md](AUTHENTICATION_FIX_IMPLEMENTATION.md)
- [AUTH_DATABASE_ANALYSIS.md](AUTH_DATABASE_ANALYSIS.md)
- [AI_IMPLEMENTATION_ANALYSIS.md](AI_IMPLEMENTATION_ANALYSIS.md)
- [AI_PIPELINE_STEP_BREAKDOWN.md](AI_PIPELINE_STEP_BREAKDOWN.md)
- [AUTO_BACKUP_IMPLEMENTATION.md](AUTO_BACKUP_IMPLEMENTATION.md)
- [BACKGROUND_FEATURE_DOCUMENTATION.md](BACKGROUND_FEATURE_DOCUMENTATION.md)
- [TEXT_FEATURES_DOCUMENTATION.md](TEXT_FEATURES_DOCUMENTATION.md)
- [DUAL_TIMELINE_LAYOUT_README.md](DUAL_TIMELINE_LAYOUT_README.md)
- [LAYOUT_BAR_IMPLEMENTATION.md](LAYOUT_BAR_IMPLEMENTATION.md)
- [KEYBOARD_SHORTCUTS_IMPLEMENTATION.md](KEYBOARD_SHORTCUTS_IMPLEMENTATION.md)
- [SNAPPING_VISUALIZATION_ENHANCEMENT.md](SNAPPING_VISUALIZATION_ENHANCEMENT.md)
- [UI_MODIFICATIONS_SUMMARY.md](UI_MODIFICATIONS_SUMMARY.md)
- [TEST_VERIFICATION_GUIDE.md](TEST_VERIFICATION_GUIDE.md)

## Status

Superseded prototype, kept for history and no longer developed; current work is in FlashFX-v2. There are no automated tests. Some integrations are demo-grade: the image search, image generation and AI chat features call third-party APIs directly from the browser with keys embedded in the source, so treat those keys as exposed and replace them with your own before relying on these features.
