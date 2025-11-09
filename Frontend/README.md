# Frontend - WXT Extension

Browser extension built with WXT, React, and TypeScript.

## Prerequisites

- **Node.js** v18+ ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)

Verify installation:
```bash
node --version
npm --version
```

## Installation

```bash
# 1. Clone and navigate
git clone <repo-url>
cd Frontend

# 2. Install dependencies
npm install
```

## Running the Project

### Development Mode

```bash
npm run dev
```

This starts the dev server with hot reload.

### Load Extension in Browser

**Chrome/Edge:**
1. Go to `chrome://extensions/`
2. Enable "Developer mode" (top right)
3. Click "Load unpacked"
4. Select the `.output/chrome-mv3` folder

**Firefox:**
1. Go to `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on"
3. Select any file in `.output/firefox-mv2` folder

The extension will auto-reload when you save changes!

## Project Structure

```
Frontend/
├── .wxt/                 # WXT cache (ignored)
├── assets/               # Static assets
├── entrypoints/          # Extension entry points
│   ├── background.ts     # Background script
│   ├── content.ts        # Content script
│   └── popup/            # Popup UI
│       ├── App.tsx       # Main popup component
│       └── main.tsx      # Entry point
├── public/               # Public assets (icons)
├── wxt.config.ts         # WXT configuration
├── tsconfig.json         # TypeScript config
└── package.json          # Dependencies
```

### Key Folders

- **`entrypoints/`** - Extension scripts and UI pages
  - `background.ts` - Runs in background
  - `content.ts` - Injected into web pages
  - `popup/` - Extension popup UI
- **`assets/`** - Images, fonts, etc.
- **`public/`** - Extension icons and manifest overrides

## Common Commands

```bash
npm run dev              # Start dev server
npm run build            # Build for Chrome
npm run build:firefox    # Build for Firefox
npm run type-check       # Check TypeScript errors
```

## Daily Workflow

```bash
# 1. Pull latest changes
git pull

# 2. Install new dependencies (if any)
npm install

# 3. Start dev server
npm run dev

# 4. Make changes (extension auto-reloads!)

# 5. Commit and push
git add .
git commit -m "Your message"
git push
```

## Adding Dependencies

```bash
# Install a package
npm install <package-name>

# Example
npm install @radix-ui/react-dialog
```

**Note:** npm automatically updates `package.json` - no manual step needed! 🎉

## Quick Tips

- **Always run `npm run dev`** during development
- **Check browser console** for errors (right-click extension icon → Inspect)
- **Hard reload** if changes don't appear (Ctrl+Shift+R)
- **Clear cache** if stuck: `rm -rf .wxt .output && npm run dev`

## Troubleshooting

**Extension not loading?**
- Make sure you selected `.output/chrome-mv3` folder (not the project root)

**Changes not showing?**
- Ensure `npm run dev` is running
- Click refresh icon on extension in `chrome://extensions`

**Module not found?**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

**Stack:** WXT + React + TypeScript + Vite