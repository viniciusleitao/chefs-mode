# Chef's Mode

A Chrome extension that turns cluttered recipe pages into a clean, readable cooking view. One click and you get just the recipe: title, servings, times, image, ingredients (with checkboxes), and method—no ads, no life stories, no endless scrolling.

Works on recipe sites in multiple languages (English, Portuguese, Spanish) and falls back to heuristics when Schema.org data isn’t available.

## What it does

Recipe sites are full of filler. Chef's Mode:

- **Reads the recipe** from the page using Schema.org data when available, or by finding common patterns (ingredients list, instructions, main image).
- **Opens a full-screen overlay** with a dark, high-contrast layout so you can read from a distance while cooking.
- **Lets you tick off ingredients** with checkboxes as you go.
- **Runs entirely in your browser**—no data is sent to any server.

Best results on sites that use standard recipe markup (Schema.org `Recipe` or `itemprop` attributes). On other sites it falls back to heuristics and may miss some content.

## Installation

1. Clone or download this repo:
   ```bash
   git clone https://github.com/YOUR_USERNAME/chefs-mode.git
   ```
2. Open Chrome and go to `chrome://extensions`.
3. Turn on **Developer mode** (top right).
4. Click **Load unpacked** and select the folder that contains the extension (e.g. `Chef mode`).
5. The Chef's Mode icon appears in your toolbar.

## How to use

1. Open any recipe page in Chrome.
2. Click the **Chef's Mode** icon in the toolbar.
3. The page dims and the recipe overlay appears with title, meta (serves, prep/cook/total time), image, ingredients, and method.
4. To close: click the **×** in the top-right, press **Esc**, or click the extension icon again.

## Features

- **Centered, readable layout** — 1200px max width, two-column section for ingredients (2/5) and method (3/5).
- **Dark overlay** — 97% black background; page behind is scroll-locked so you only scroll the recipe.
- **Typography** — Roboto Mono for body text, Google Sans for the close and check symbols.
- **Checkboxes** — Tick off ingredients as you use them.
- **Isolated styling** — Overlay is rendered in a Shadow DOM so site CSS doesn’t override fonts or layout.

## Project structure

```
Chef mode/
├── manifest.json    # Chrome extension manifest (Manifest V3)
├── background.js    # Handles toolbar click, talks to content script
├── contentScript.js # Recipe extraction + overlay UI and styles
└── README.md
```

## Privacy

All processing happens in the tab. The extension does not send recipe data or any other information to external servers.

## License

MIT License — use and modify as you like. See [LICENSE](LICENSE) for details.
