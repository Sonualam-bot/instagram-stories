# Instagram Stories

A simplified, mobile-only implementation of the Instagram Stories feature — a horizontally scrollable tray of users, each with one or more stories, viewable full-screen with tap navigation and timed auto-advance.

## Features

- Horizontally scrollable story tray, fetched at runtime from `public/stories.json`
- Full-screen story viewer with a segmented progress bar — one segment per story, scoped to the currently open user (not the whole app)
- Tap left third of the screen for the previous story, right two-thirds for the next
- Auto-advances to the next story after 5 seconds
- Loading state per story: a spinner shows while the image preloads, and the 5-second timer only starts once the image has actually loaded (so a story can't expire before it's visible)
- Viewed users get a grey thumbnail ring instead of the gradient ring, updated whether a user's stories were opened directly or passed through via auto-advance
- Built for mobile only: the app is capped at a 480px-wide column, centered, rather than adopting a separate desktop layout

## Tech stack

- React + Vite, plain JavaScript
- Plain hand-written CSS (BEM-style class names for scoping, no CSS framework)
- No external libraries for carousel, animation, or state management — navigation, timing, and preloading are all hand-rolled

## Getting started

```bash
npm install
npm run dev
```

Open the dev server URL with your browser's mobile device emulation enabled (e.g. Chrome DevTools device toolbar) — there is no desktop layout.

## Project structure

```
src/
  constants/
    story.constants.js      Single source of truth for story duration, tap-zone split, data URL
  utils/
    storyNavigation.js      Pure functions computing next/previous { userIndex, storyIndex }
  hooks/
    useStories.js           Fetches stories.json
    useStoryNavigation.js   Owns current viewer position and navigation
    useImagePreloader.js    Generic image load-status tracker
    useViewedUsers.js       Tracks which users have been viewed
  components/
    StoryTray/               Horizontal scroll list of thumbnails
    StoryThumbnail/          Single circular avatar + label
    StoryViewer/              Orchestrates the full-screen story view
    ProgressBar/             Generic segmented progress indicator
    TapZones/                Generic left/right tap overlay
    LoadingSpinner/
  App.jsx                    Composition root — fetches data, owns state, wires everything together
public/
  stories.json               Sample story data
```

Presentational components (`ProgressBar`, `TapZones`, `StoryThumbnail`, `StoryTray`, `LoadingSpinner`) take all their behavior via props and have no knowledge of the story domain model, network requests, or app-level state — `App.jsx` is the only place data fetching and navigation state are wired together.

## Data model

`stories.json` is a list of users, each with their own `stories` array:

```json
{
  "id": 1,
  "username": "sonu_alam",
  "avatar": "https://...",
  "stories": [
    { "id": "1-1", "imageUrl": "https://..." },
    { "id": "1-2", "imageUrl": "https://..." }
  ]
}
```

The progress bar segment count always matches the current user's story count — a user with one story shows one segment, a user with four shows four.

## Scope decisions

- Tapping left on the very first story of the first user is a no-op; tapping right past the last story of the last user closes the viewer.
- Tapping right past a user's last story advances into the next user's first story (and vice versa for left), matching Instagram's behavior.
- Story images are placeholder photos from picsum.photos; disappearance/expiry logic was explicitly out of scope per the assignment.
